import { App, Box, Button, CheckBoxGroup, Dropdown, ProgressBar, Text, Window, WindowProvider } from '@duck4i/retro-ui';
import '@duck4i/retro-ui/style.css';
import { useEffect, useState } from 'react';
import { Device, Model } from './pipeline';
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

interface ChooseModelProps {
    onSelect: (model: Model, mode: Device) => void;
};

const ChooseModelWindow = ({ onSelect }: ChooseModelProps) => {
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

const InferenceWindow = () => {

    const [answer, setAnswer] = useState('');

    const onClose = () => {

    }

    const onInference = () => {
        setAnswer("Inference");
    }

    useEffect(() => {

    }, [])

    return (
        <Window title="Inference" location='center' width={480} onClose={onClose} >
            <Box vertical border="none">
                <Text label='Inference' color='silver' backgroundColor='green' />
                <br />
                <Text label={answer} />
                <br />
                <Button label='Inference' onClick={onInference} />
            </Box>
        </Window>
    )
}

const RetroLlama = () => {

    enum State { Welome, ChoseModel, Download, Inference, Error };
    const [state, setState] = useState(State.Welome);
    const [model, setModel] = useState<Model>(Model.Smol);
    const [device, setDevice] = useState<Device>('wasm');
    const { error, ready } = useWorker()!;

    useEffect(() => {
        if (ready){
            setState(State.Inference);
        }
        if (error) {
            setState(State.Error);
        }
    }, [error, ready]);

    const onWelcomeNext = () => {
        setState(State.ChoseModel);
    }

    const onErrorClose = () => {
        setState(State.ChoseModel);
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
                {state === State.ChoseModel && <ChooseModelWindow onSelect={onModelSelected} />}
                {state === State.Download && <DownloadModelWindow mode={device} model={model} />}
                {state === State.Inference && <InferenceWindow />}
                {state === State.Error && <ErrorWindow error={error ?? "unknown"} onClose={onErrorClose}/>}
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
            <p>Code on <a href='https://github.com/duck4i/retro-ui' target='_blank'> GitHub </a></p>
        </div>
    )
}