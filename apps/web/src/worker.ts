import { Pipeline } from './pipeline';
import { MessageType, type WorkerRequest } from './messages';

let pipeline: Pipeline | null = null;

self.onmessage = async (event) => {
    const message = event.data as WorkerRequest;
    console.log('[Worker] Message:', message);

    switch (message.type) {
        case MessageType.Init: {
            const { model, device } = message;
            try {
                pipeline = Pipeline.getInstance();
                pipeline.addDownloadCallback((progress, file, modelUrl) => {
                    self.postMessage({ type: MessageType.OnDownload, progress, file, modelUrl });
                });
                pipeline.addReadyCallback((task, model) => {
                    self.postMessage({ type: MessageType.OnReady, task, model });
                });
                await pipeline.init(model, device);
            } catch (error) {
                self.postMessage({ type: MessageType.OnError, error: error });
            }
            break;
        }
        case MessageType.Infer: {
            const { input } = message;
            console.log('[Worker] Infer:', input);
            try {
                if (pipeline === null) {
                    throw new Error('Pipeline not initialized');
                }
                const output = await pipeline.infer(input, (fragment) => {
                    self.postMessage({ type: MessageType.OnInfer, partial: true, output: fragment });
                });

                self.postMessage({ type: MessageType.OnInfer, output });
            } catch (error) {
                self.postMessage({ type: MessageType.OnError, error: error });
            }
            break;
        }
    }
}