import { pipeline, ProgressInfo, TextGenerationPipeline } from '@huggingface/transformers';

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

export class Pipeline {
    static instance: Pipeline;
    pipeline: TextGenerationPipeline | null;
    downloadCallbacks: DownloadCallback[] = [];

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

    async init(model: Model, device: Device = 'wasm') {
        const url = modelInfos[model].url;
        const file = modelInfos[model].file ?? 'model';
        const dtype: DataType = modelInfos[model].dType;

        this.pipeline = await pipeline('text-generation', url, {
            model_file_name: file,
            dtype: dtype,
            progress_callback: (info: ProgressInfo) => {
                if (info && info.status === 'progress') {
                    const progress = (info as any).progress;
                    const name = (info as any).file;

                    if (name && progress) {
                        this.downloadCallbacks.forEach(callback => callback(progress, name, url));
                    }
                }
            },
            device: device
        });
    }

    async infer(input: string): Promise<string> {
        if (this.pipeline === null) {
            throw new Error('Pipeline not initialized');
        }

        const message: ChatMessage[] = [
            {
                role: 'system',
                content: 'You are a helpful assistant.'
            },
            {
                role: 'user',
                content: input
            }
        ];

        const prompt = this.pipeline.tokenizer.apply_chat_template(message, {
            tokenize: false,
            add_generation_prompt: true
        }) as any;

        const out = await this.pipeline(prompt, {
            max_new_tokens: 128,
            do_sample: false,
            return_full_text: false,
        });

        return (out[0] as any).generated_text;
    }
}