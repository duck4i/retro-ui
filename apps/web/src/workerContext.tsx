import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MessageType, WorkerResponse } from "./messages";
import { Device, Model } from "./pipeline";

export interface WorkerContextData {
    modelName: string;
    downloadedFiles: Record<string, number>;
    inferenceOutput: string;
    ready: boolean;
    error?: string;
    downloadModel: (model: Model, deviceMode: Device) => void;
    startInference: (text: string) => void;
}

const WorkerContext = createContext<WorkerContextData | null>(null);

export const WorkerProvider = ({ children }: { children: React.ReactNode }) => {
    const workerRef = useRef<Worker | null>(null);
    const [modelName, setModelName] = useState('');
    const [downloadedFiles, setDownloadedFiles] = useState<Record<string, number>>({});
    const [inferenceOutput, setInferenceOutput] = useState<string>('');
    const [ready, setReady] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        workerRef.current = new Worker(new URL('./worker', import.meta.url), { type: 'module' });

        const onMessage = (event: MessageEvent) => {
            const message = event.data as WorkerResponse;
            console.log('[Worker] Message:', message);

            switch (message.type) {
                case MessageType.OnDownload: {
                    const { progress, file, modelUrl } = message;
                    setDownloadedFiles(prev => ({ ...prev, [file]: Math.max(prev[file] ?? 0, progress) }));
                    setModelName(modelUrl);
                    break;
                }
                case MessageType.OnInfer: {
                    const { output } = message;
                    setInferenceOutput(output);
                    break;
                }
                case MessageType.OnReady: {
                    //const { task, model } = message;
                    setReady(true);
                    break;
                }
                case MessageType.OnError: {
                    setError(message.error.toString());
                    break;
                }
            }
        };

        workerRef.current.addEventListener('message', onMessage);

        return () => {
            workerRef.current?.removeEventListener('message', onMessage);
            workerRef.current?.terminate();
        };
    }, []);

    const downloadModel = useCallback((model: Model, deviceMode: Device) => {
        setError('');
        workerRef.current?.postMessage({ type: MessageType.Init, model: model, device: deviceMode });
    }, []);

    const startInference = useCallback((text: string) => {
        workerRef.current?.postMessage({ type: MessageType.Infer, input: text });
    }, []);

    return (
        <WorkerContext.Provider value={{ modelName, downloadedFiles, inferenceOutput, ready, error, downloadModel, startInference }}>
            {children}
        </WorkerContext.Provider>
    );
};

export const useWorker = () => useContext(WorkerContext);