import { App, Window, WindowProvider, Button, Text, ButtonGroup, Box, BigText, Scrollbar, ProgressBar, Input, InputBox, CheckBox, Dropdown, CheckBoxGroup } from '@duck4i/retro-ui';
import '@duck4i/retro-ui/style.css'
import { useState } from 'react';

const ComponentsDemo = () => {

    const [w1, setW1] = useState(true);
    const [w2, setW2] = useState(true);
    const [w3, setW3] = useState(true);
    const [w4, setW4] = useState(true);
    const [text, setText] = useState('');
    const [checked, setChecked] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 1000, height: 800 }}>
            <App>
                <WindowProvider>

                    {w1 &&
                        <Window title="Mixed components" onClose={() => { setW1(false) }} >
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
                        <Window title="Label styles" onClose={() => { setW2(false) }} x={150} y={150} width={500} >
                            <Text label='Hello' />
                            <Text label='Hello' bold blink />
                            <Text label='Hello' backgroundColor='magenta' color='white' />
                            <Scrollbar height='90px' alwaysShowVertical padding={10} backgroundColor='cyan' >
                                <BigText label='Hey bro' />
                            </Scrollbar>
                        </Window>
                    }

                    {w3 &&
                        <Window title="Boxes and bars" x={350} y={300} onClose={() => setW3(false)} >
                            <Box vertical gap={3}>
                                <Text label={`Type: ${text}`} />
                                <Input defaultValue="Input" onChange={(value) => { setText(value) }} />
                                <InputBox defaultValue={`InputBox \n with \n multitext`} onChange={(value) => { setText(value) }} readOnly />
                            </Box>
                            <Box type='inset' >
                                <Text label='Box inset' />
                            </Box>
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
                        <Window title="Lists" x={450} y={550} onClose={() => setW4(false)} >
                            <Dropdown options={['Option 1', 'Option 2', 'Option 3']} selectedOption={selectedIndex} onChange={(selected) => setSelectedIndex(selected)} />
                        </Window>
                    }

                </WindowProvider>
            </App>
        </div>
    )
}

export default function DemoApp() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>@duck4i/retro-llama</h1>
            <ComponentsDemo />
        </div>
    )
}