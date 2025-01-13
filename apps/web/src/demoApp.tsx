import { RetroApp, RetroWindow, RetroWindowProvider, RetroButton, RetroText } from '@duck4i/retro-ui';
import '@duck4i/retro-ui/style.css'

export default function DemoApp() {
    return (
        <div>
            <h1>@duck4i/retro-llama</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 800, height: 600 }}>
                <RetroApp>
                    <RetroWindowProvider>
                    <RetroWindow title="Window 1" onClose={() => { }} >
                        <RetroText label='Hello' />
                        <RetroButton label='Button' onClick={() => { }} />
                        <RetroText label='Hello' bold />
                        <RetroText label='Hello' bold blink />
                        <RetroText label='Hello' inverse />
                    </RetroWindow>

                    <RetroWindow title="Window 2" onClose={() => { }} >
                        <RetroText label='Hello' />
                    </RetroWindow>


                    <RetroWindow title="Window 3" onClose={() => { }} >
                        <RetroText label='Hello' />
                    </RetroWindow>
                    </RetroWindowProvider>
                </RetroApp>
            </div>
        </div>
    )
}