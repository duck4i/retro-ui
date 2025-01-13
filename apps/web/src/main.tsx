import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import DemoApp from './demoApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DemoApp>
        </DemoApp>
    </React.StrictMode>,
)