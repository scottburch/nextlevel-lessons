import React from 'react';
import ReactDOM from 'react-dom/client';
import {Main} from './Main.jsx';


setTimeout(() => renderIt());

const renderIt = () => {
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(<Main/>);
}

