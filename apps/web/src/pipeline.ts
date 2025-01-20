import { pipeline, ProgressInfo, TextGenerationPipeline, TextStreamer } from '@huggingface/transformers';

export enum Model {
    Smol = 'Smol',
    Qwen = 'Qwen',
    LLama = 'LLama'
};

export type Device = 'wasm' | 'webgpu';
export type DataType = 'q4' | 'q8' | 'fp16';

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ModelInfo {
    url: string;
    dType: DataType;
    file?: string;
}

const modelInfos: Record<string, ModelInfo> = {

    [Model.Smol]: {
        url: 'HuggingFaceTB/SmolLM2-360M-Instruct',
        dType: 'q4'
    },
    [Model.Qwen]: {
        url: 'Mozilla/Qwen2.5-0.5B-Instruct',
        dType: 'q4'
    },
    [Model.LLama]: {
        url: 'Xenova/Phi-3-mini-4k-instruct',
        dType: 'q8',
    }
};

export type DownloadCallback = (progress: number, file: string, modelUrl: string) => void;
export type TaskReadyCallback = (task: string, model: string) => void;
export type InferStreamCallback = (output: any) => void;

export class Pipeline {
    static instance: Pipeline;
    pipeline: TextGenerationPipeline | null;
    downloadCallbacks: DownloadCallback[] = [];
    readyCallbacks: TaskReadyCallback[] = [];

    constructor() {
        this.pipeline = null;
    }

    static getInstance() {
        if (!Pipeline.instance) {
            Pipeline.instance = new Pipeline();
        }
        return Pipeline.instance;
    }

    addDownloadCallback(callback: DownloadCallback) {
        this.downloadCallbacks.push(callback);
    }

    addReadyCallback(callback: TaskReadyCallback) {
        this.readyCallbacks.push(callback);
    }

    async init(model: Model, device: Device = 'wasm') {
        const url = modelInfos[model].url;
        const file = modelInfos[model].file ?? 'model';
        const dtype: DataType = modelInfos[model].dType;

        this.pipeline = await pipeline('text-generation', url, {
            model_file_name: file,
            dtype: dtype,
            progress_callback: (info: ProgressInfo) => {
                if (info) {
                    if (info.status === 'progress') {
                        const progress = (info as any).progress;
                        const name = (info as any).file;

                        if (name && progress) {
                            this.downloadCallbacks.forEach(callback => callback(progress, name, url));
                        }
                    }
                    if (info.status === 'ready') {
                        const task = (info as any).task;
                        const model = (info as any).model;
                        this.readyCallbacks.forEach(callback => callback(task, model));
                    }
                }
            },
            device: device
        });
    }

    async infer(chat: ChatMessage[], streamCallback: InferStreamCallback): Promise<string> {
        if (this.pipeline === null) {
            throw new Error('Pipeline not initialized');
        }

        const prompt = this.pipeline.tokenizer.apply_chat_template(chat, {
            tokenize: false,
            add_generation_prompt: true
        }) as any;

        const streamer = new TextStreamer(this.pipeline.tokenizer, {
            skip_prompt: true
        });
        streamer.callback_function = streamCallback;

        const out = await this.pipeline(prompt, {
            max_new_tokens: 128,
            do_sample: false,
            return_full_text: false,
            streamer: streamer
        });
        return (out[0] as any).generated_text;
    }
}