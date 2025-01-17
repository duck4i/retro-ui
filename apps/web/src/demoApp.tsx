import { App, Window, WindowProvider, Button, Text, ButtonGroup, Box, BigText, Scrollbar, ProgressBar, Input, InputBox, Dropdown, CheckBoxGroup, ListView } from '@duck4i/retro-ui';
import '@duck4i/retro-ui/style.css'
import { useEffect, useState } from 'react';
import { pipeline, ProgressInfo } from '@huggingface/transformers';

const ComponentsDemo = () => {

    const [w1, setW1] = useState(true);
    const [w2, setW2] = useState(true);
    const [w3, setW3] = useState(true);
    const [w4, setW4] = useState(true);
    const [text, setText] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 1000, height: 800 }}>
            <App>
                <WindowProvider>

                    {w1 &&
                        <Window title="Mixed components" onClose={() => { setW1(false) }} x={10} y={10}>
                            <Text label='Hello' />
                            <ButtonGroup>
                                <Button label='Button' onClick={() => { }} />
                                <Button label='Button 2' onClick={() => { }} />
                                <Button label='Button 3' disabled onClick={() => { }} />
                            </ButtonGroup>
                            <ButtonGroup vertical backgroundColor='green'>
                                <Button label='Button 4' onClick={() => { }} />
                                <Button label='Button 5' onClick={() => { }} />
                            </ButtonGroup>
                        </Window>
                    }

                    {w2 &&
                        <Window title="Label styles" onClose={() => { setW2(false) }} x={450} y={10} width={500} >
                            <Text label='Hello' />
                            <Text label='Hello' bold blink />
                            <Text label='Hello' backgroundColor='yellow' color='black' />
                            <Scrollbar height='90px' alwaysShowVertical padding={10} backgroundColor='cyan' >
                                <BigText label='Hey bro' />
                            </Scrollbar>
                        </Window>
                    }

                    {w3 &&
                        <Window title="Boxes and bars" x={10} y={300} onClose={() => setW3(false)} >
                            <Box vertical gap={3}>
                                <Text label={`Type: ${text}`} />
                                <Input defaultValue="Input" onChange={(value) => { setText(value) }} />
                                <InputBox defaultValue={`InputBox \n with \n multitext`} onChange={(value) => { setText(value) }} readOnly />
                            </Box>
                            <Box type='inset' backgroundColor='magenta' >
                                <Text label='Box inset' />
                            </Box>
                            <Text label='Progress bar' />
                            <ProgressBar progress={50} max={100} />
                            <CheckBoxGroup toggle options={[
                                { label: "Check me", checked: true },
                                { label: "No check me ", checked: false }
                            ]
                            } >
                            </CheckBoxGroup>
                        </Window>
                    }

                    {w4 &&
                        <Window title="Lists" x={450} y={300} onClose={() => setW4(false)} >
                            <ListView items={['Item 1', 'Item 2', 'Item 3']} selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)} />
                            <Dropdown options={['Option 1', 'Option 2', 'Option 3']} selectedOption={selectedIndex} onChange={(selected) => setSelectedIndex(selected)} />

                        </Window>
                    }

                </WindowProvider>
                <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <Text label={`Retro-UI`} color="white" />
                    <Text label={`@duck4i 1984`} color="white" />
                </div>
            </App>
        </div>
    )
}

let pipe: any = null;

const RetroLlama = () => {

    enum State { Welome, ChoseModel, Download, Inference, Error };
    enum Models {
        Smol = "HuggingFaceTB/SmolLM2-135M-Instruct",
        Qwen = "Mozilla/Qwen2.5-0.5B-Instruct",
        LaMini = "Xenova/gpt2"
    };

    const [state, setState] = useState(State.Welome);
    const [modelOptions, setModelOptions] = useState([
        { label: "Smol", checked: true },
        { label: "Qwen", checked: false },
        { label: "LaMini", checked: false }
    ]);
    const [deviceMode, setDeviceMode] = useState<'wasm' | 'webgpu'>('wasm');

    const [error, setError] = useState('');

    const ErrorWindow = () => {
        return (
            <Window title="Error" location='center' width={600} onClose={() => setState(State.ChoseModel)} >
                <Box vertical border="none">
                    <Text label={error} backgroundColor='red' color='white' />
                    <br />
                    <Button label='Close' onClick={() => setState(State.ChoseModel)} />
                </Box>
            </Window>
        )
    }

    const DownloadModelWindow = () => {
        interface FileProgress {
            name: string;
            progress: number;
        }

        const [downloadedFiles, setDownloadedFiles] = useState<FileProgress[]>([]);

        const download = async (url: string) => {

            pipe = await pipeline('text-generation', url, {
                progress_callback: (info: ProgressInfo) => {
                    const progress = (info as any).progress;
                    const name = (info as any).file;

                    if (name) {
                        let item = downloadedFiles.find(file => file.name === name);

                        if (!item) {
                            const id = downloadedFiles.push({ name, progress: 0 });
                            item = downloadedFiles.at(id);
                        }
                        if (progress) {
                            item!.progress = Math.max(item!.progress, progress);
                        }

                        setDownloadedFiles([...downloadedFiles]);
                    }
                },
                device: deviceMode
            });

            //const out = await pipe('How are you doing today?');
            //console.log(out);
        };

        useEffect(() => {
            const selectedModel = Models[modelOptions.find(option => option.checked)?.label as keyof typeof Models];
            console.log('Downloading model:', selectedModel);

            download(selectedModel).then(() => {
                setState(State.Inference);
            }).catch((err) => {
                setError(err.toString());
                setState(State.Error);
            });
        }, []);

        return (
            <Window title="Downloading..." x={10} y={10} width={480} onClose={() => { }} >
                <br />
                {
                    downloadedFiles.map((info, index) => {
                        return (
                            <div key={index}>
                                <Text key={`lb-${index}`} label={` ${info.name}..`} />
                                <ProgressBar key={`pb-${index}`} progress={info.progress} max={100} />
                            </div>
                        )
                    })
                }
            </Window>
        )
    }

    const ChoseModelWindow = () => {

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
                        setState(State.Download);
                    }} />
                </Box>
            </Window>
        )
    }

    const InferenceWindow = () => {

        const [answer, setAnswer] = useState('');

        const inference = async (text: string): Promise<string> => {
            const out = await pipe(text);
            console.log(out);
            return out[0].generated_text;
        }

        useEffect(() => {

            inference("How are you").then((str) => {
                if (str) {
                    setAnswer(str);
                }
            }).catch((err) => {
                console.error("Error", err);
            });

        }, [])

        return (
            <Window title="Inference" location='center' width={480} onClose={() => setState(State.Welome)} >
                <Box vertical border="none">
                    <Text label='Inference' color='silver' backgroundColor='green' />
                    <br />
                    <Text label={answer} />
                    <br />
                    <Button label='Inference' onClick={() => setState(State.ChoseModel)} />
                </Box>
            </Window>
        )
    }

    const WelcomeWindow = () => {

        const close = () => {
            setState(State.ChoseModel);
        }

        return (

            <Window title="Welcome to Retro Llama" location='center' width={500} onClose={close} >
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

    return (
        <App width={800} height={600}>
            <WindowProvider>
                {state === State.Welome && <WelcomeWindow />}
                {state === State.ChoseModel && <ChoseModelWindow />}
                {state === State.Download && <DownloadModelWindow />}
                {state === State.Inference && <InferenceWindow />}
                {state === State.Error && <ErrorWindow />}
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
            {false && <ComponentsDemo />}
            <RetroLlama />
            <p>Code on <a href='https://github.com/duck4i/retro-ui' target='_blank'> GitHub </a></p>
        </div>
    )
}