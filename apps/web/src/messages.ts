import { ChatMessage, Device, Model } from "./pipeline";

export enum MessageType {
    Init = 'init',
    OnDownload = 'onDownload',
    Infer = 'infer',
    OnInfer = 'onInfer',
    OnReady = 'onReady',
    OnError = 'error',
}

export interface InitMessage {
    type: MessageType.Init;
    model: Model;
    device: Device;
}

export interface InferMessage {
    type: MessageType.Infer;
    input: ChatMessage[];
}

export type WorkerRequest = InitMessage | InferMessage;

export interface OnDownloadMessage {
    type: MessageType.OnDownload;
    progress: number;
    file: string;
    modelUrl: string;
}

export interface OnInferMessage {
    type: MessageType.OnInfer;
    partial: boolean;
    output: string;
}

export interface OnReadyMessage {
    type: MessageType.OnReady;
    task: string;
    model: string;
}

export interface OnErrorMessage {
    type: MessageType.OnError;
    error: string;
}

export type WorkerResponse = OnDownloadMessage | OnInferMessage | OnReadyMessage | OnErrorMessage;