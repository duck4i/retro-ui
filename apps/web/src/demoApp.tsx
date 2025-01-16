import { App, Window, WindowProvider, Button, Text, ButtonGroup, Box, BigText, Scrollbar, ProgressBar } from '@duck4i/retro-ui';
import '@duck4i/retro-ui/style.css'
import { useState } from 'react';

const ComponentsDemo = () => {

    const [w1, setW1] = useState(true);
    const [w2, setW2] = useState(true);
    const [w3, setW3] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 800, height: 600 }}>
            <App>
                <WindowProvider>

                    {w1 && <Window title="Mixed components" onClose={() => { setW1(false) }} >
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

                    {w2 && <Window title="Label styles" onClose={() => { setW2(false) }} x={150} y={150} width={500} >
                        <Text label='Hello' />
                        <Text label='Hello' bold blink />
                        <Text label='Hello' backgroundColor='magenta' color='white' />
                        <Scrollbar height='90px' alwaysShowVertical padding={10} backgroundColor='cyan' >
                            <BigText label='Hey bro' />
                        </Scrollbar>
                    </Window>
                    }

                    {w3 && <Window title="Window 3" x={350} y={400} onClose={() => setW3(false)} >
                        <Box>
                            <Text label='Box Border' />
                        </Box>
                        <Box type='inset' vertical>
                            <Text label='Box inset' />
                            <ProgressBar progress={50} max={100} />
                        </Box>
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