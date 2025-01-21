import { App, Box, Button, CheckBoxGroup, Dropdown, InputBox, ProgressBar, Scrollbar, Text, Window, WindowProvider } from '@duck4i/retro-ui';
import '@duck4i/retro-ui/style.css';
import { useEffect, useState } from 'react';
import { ChatMessage, Device, Model } from './pipeline';
import { useWorker, WorkerProvider } from './workerContext';

interface WelcomeProps {
    onProceed: () => void;
}

const WelcomeWindow = ({ onProceed }: WelcomeProps) => {

    const close = () => {
        onProceed();
    }

    return (
        <Window title="Welcome to Retro Llama" location='center' width={500} onClose={() => { }} >
            <Box vertical border="none">
                <Text label='Welcome to Retro LLaMA!' color='silver' backgroundColor='green' />
                <br />
                <Text label='This project is a usable demo of the Retro-UI components framework for React with HF Transformers.' />
                <Text label='It is a fun and educational project that aims to provide a simple and easy-to-use set of components for building retro-styled applications.' />
                <br />
                <Text label='Built for fun by @duck4i' blink />
                <br />
                <Button label='Chose AI model' onClick={close} />
            </Box>
        </Window>
    )
}

interface ErrorWindowProps {
    error: string;
    onClose: () => void;
}

const ErrorWindow = ({ error, onClose }: ErrorWindowProps) => {
    return (
        <Window title="Error" location='center' width={600} onClose={onClose} >
            <Box vertical border="none">
                <Text label={error} backgroundColor='red' color='white' />
                <br />
                <Button label='Close' onClick={onClose} />
            </Box>
        </Window>
    )
}

interface DownloadModelProps {
    model: Model;
    mode: Device;
}

const DownloadModelWindow = ({ model, mode }: DownloadModelProps) => {
    const { modelName, downloadedFiles, downloadModel } = useWorker()!;

    useEffect(() => {
        downloadModel(model, mode);
    }, []);

    return (
        <Window title="Downloading..." x={10} y={10} width={480} onClose={() => { }} >
            <Text label={modelName} />
            <br />
            {
                Object.entries(downloadedFiles).map(([name, progress], index) => {
                    return (
                        <div key={index}>
                            <Text key={`lb-${index}`} label={` ${name}..`} />
                            <ProgressBar key={`pb-${index}`} progress={progress} max={100} />
                        </div>
                    )
                })
            }
        </Window>
    )
}

interface SelectModelProps {
    onSelect: (model: Model, mode: Device) => void;
};

const SelectModelWindow = ({ onSelect }: SelectModelProps) => {
    const [modelOptions, setModelOptions] = useState([
        { label: [Model.Smol].toString(), checked: true },
        { label: [Model.Qwen].toString(), checked: false },
        { label: [Model.LLama].toString(), checked: false }
    ]);
    const [deviceMode, setDeviceMode] = useState<Device>('wasm');

    return (
        <Window title="Download AI models" location='center' width={480} onClose={() => { }} >
            <Box vertical border="none">
                <Text label='Download AI models' color='silver' backgroundColor='green' />
                <br />
                <Text label='Please select the AI models you would like to download.' />
                <CheckBoxGroup toggle onChange={(options) => { setModelOptions(options) }} options={modelOptions} padding={5} />
                <br />
                <Box padding={10}>
                    <Text label='Device mode:' />
                    <Dropdown options={['wasm', 'webgpu']} selectedOption={deviceMode === 'wasm' ? 0 : 1} onChange={(selected) => setDeviceMode(selected === 0 ? 'wasm' : 'webgpu')} />
                </Box>
                <br />
                <Button label='Download' onClick={() => {
                    const selectedModel = Model[modelOptions.find(option => option.checked)?.label as keyof typeof Model];
                    onSelect(selectedModel, deviceMode);
                }} />
            </Box>
        </Window>
    )
}

interface InferenceProps {
    title: string;
    onClose: () => void;
}

const InferenceWindow = ({ title, onClose }: InferenceProps) => {
    const { inferenceOutput, inferenceStream, startInference, error } = useWorker()!;

    const [enabled, setEnabled] = useState(true);
    const [question, setQuestion] = useState('How many ducks can one own?');

    enum Type { Question, Answer };
    interface Info { type: Type; content: string; }
    const [answers, setAnswers] = useState<Info[]>([]);

    const [chat, setChat] = useState<ChatMessage[]>(
        [
            {
                role: 'system',
                content: 'You are a helpful assistant.'
            },
        ]
    );

    const onInference = () => {
        setEnabled(false);
        setQuestion('');
        const chats = [...chat];
        chats.push({ role: 'user', content: question });
        setChat(chats);

        setAnswers([...answers, { type: Type.Question, content: question }, { type: Type.Answer, content: '' }]);
        startInference(chats);
    }

    useEffect(() => {
        if (inferenceOutput) {
            setChat([...chat, { role: 'assistant', content: inferenceOutput }]);
            setEnabled(true);
        }
    }, [inferenceOutput]);

    useEffect(() => {
        const last = answers[answers.length - 1];
        if (last) {
            last.content = inferenceStream;
            setAnswers([...answers]);
        }
    }, [inferenceStream]);

    return (
        <Window title={`${title}`} location='center' width={700} height={550} onClose={onClose} >
            <Box vertical border="none">
                <Scrollbar width={"100%"} height={430} backgroundColor='cyan' vertical alwaysShowVertical>
                    {
                        answers.map((answer, index) => {
                            return (
                                <Text key={index} label={answer.content} backgroundColor={answer.type === Type.Question ? 'magenta' : 'cyan'} color={answer.type === Type.Question ? 'white' : 'black'} />
                            )
                        })
                    }
                </Scrollbar>
                <Box width={"100%"} height={50} border="none">
                    <InputBox value={question} onChange={(value) => {
                        setQuestion(value)
                        setEnabled(value.length > 0)
                    }} />
                    <br />
                    <Button label='Send' onClick={onInference} width={75} disabled={!enabled} />
                </Box>
            </Box>
        </Window>
    )
}

const RetroLlama = () => {

    enum State { Welome, Select, Download, Inference, Error };
    const [state, setState] = useState(State.Welome);
    const [model, setModel] = useState<Model>(Model.Smol);
    const [device, setDevice] = useState<Device>('wasm');
    const { error, ready, modelName } = useWorker()!;

    useEffect(() => {
        //  Sometimes a model will throw an error but still be loaded and ready to use
        //  in which case we allow it to proceed to the inference window.
        if (error) {
            setState(State.Error);
        }
        if (ready) {
            setState(State.Inference);
        }
    }, [error, ready]);

    const onWelcomeNext = () => {
        setState(State.Select);
    }

    const onErrorClose = () => {
        setState(State.Select);
    }

    const onModelSelected = (model: Model, mode: Device) => {
        setModel(model);
        setDevice(mode);
        setState(State.Download);
    }

    return (
        <App width={800} height={600}>

            <WindowProvider>
                {state === State.Welome && <WelcomeWindow onProceed={onWelcomeNext} />}
                {state === State.Select && <SelectModelWindow onSelect={onModelSelected} />}
                {state === State.Download && <DownloadModelWindow mode={device} model={model} />}
                {state === State.Inference && <InferenceWindow title={modelName} onClose={onErrorClose} />}
                {state === State.Error && <ErrorWindow error={error ?? "unknown"} onClose={onErrorClose} />}
            </WindowProvider>

            <div style={{ position: 'absolute', bottom: 0, left: 5 }}>
                <Text label={`Retro-LLaMA`} color="white" />
                <Text label={`@duck4i 1984`} color="white" />
            </div>
        </App>
    )
}

export default function DemoApp() {
    return (
        <div className='demo'>
            <h1>@duck4i/retro-llama</h1>
            <WorkerProvider>
                <RetroLlama />
            </WorkerProvider>
            <div className='footer'>
                <p>Code on <a href='https://github.com/duck4i/retro-ui' target='_blank'> GitHub </a></p>
                <p>Docs on <a href='https://retro-ui.pages.dev/' target='_blank'> Cloudflare </a></p>
            </div>
        </div>
    )
}