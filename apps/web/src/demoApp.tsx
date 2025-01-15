import { App, Window, WindowProvider, Button, Text, ButtonGroup, Box, BigText, Scrollbar, ProgressBar } from '@duck4i/retro-ui';
import '@duck4i/retro-ui/style.css'

export default function DemoApp() {
    return (
        <div>
            <h1>@duck4i/-llama</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 800, height: 600 }}>
                <App>
                    <WindowProvider>

                        <Window title="Mixed components" onClose={() => { }} >
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

                        <Window title="Label styles" onClose={() => { }} x={150} y={150} width={500} gap={10} >
                            <Text label='Hello' />
                            <Text label='Hello' bold blink />
                            <Text label='Hello' backgroundColor='magenta' color='white' />
                            <Scrollbar height='90px' alwaysShowVertical padding={10} backgroundColor='cyan' >
                                <BigText label='Hey bro' />
                            </Scrollbar>
                        </Window>

                        <Window title="Window 3" x={250} y={250} onClose={() => { }} >
                            <Box>
                                <Text label='Box Border' />
                            </Box>
                            <Box type='inset' vertical>
                                <Text label='Box inset' />
                                <Button label='Button' onClick={() => { }} />
                                <br />
                                <ProgressBar progress={50} max={100} />
                            </Box>
                        </Window>

                    </WindowProvider>
                </App>
            </div>
        </div>
    )
}