import { RetroApp, RetroWindow, RetroWindowProvider, RetroButton, RetroText, RetroButtonGroup } from '@duck4i/retro-ui';
import '@duck4i/retro-ui/style.css'

export default function DemoApp() {
    return (
        <div>
            <h1>@duck4i/retro-llama</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 800, height: 600 }}>
                <RetroApp>
                    <RetroWindowProvider>
                        <RetroWindow title="Mixed components" onClose={() => { }} >
                            <RetroText label='Hello' />
                            <RetroButtonGroup>
                                <RetroButton label='Button' onClick={() => { }} />
                                <RetroButton label='Button 2' onClick={() => { }} />
                                <RetroButton label='Button 3' disabled onClick={() => { }} />
                            </RetroButtonGroup>
                            <RetroButtonGroup vertical>
                                <RetroButton label='Button 4' onClick={() => { }} />
                                <RetroButton label='Button 5' onClick={() => { }} />
                            </RetroButtonGroup>
                        </RetroWindow>

                        <RetroWindow title="Label styles" onClose={() => { }} x={150} y={150}>
                            <RetroText label='Hello'  />
                            <RetroText label='Hello' bold blink />
                            <RetroText label='Hello' inverse />
                        </RetroWindow>

                        <RetroWindow title="Window 3" x={250} y={250} onClose={() => { }} >
                            <RetroText label='Hello' />
                        </RetroWindow>
                    </RetroWindowProvider>
                </RetroApp>
            </div>
        </div>
    )
}