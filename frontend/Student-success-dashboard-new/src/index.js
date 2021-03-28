import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/app';
import 'antd/dist/antd.css';




const render = Component => {
    ReactDOM.render(
        <React.StrictMode>
            <Component />
        </React.StrictMode>,
        document.getElementById('root')
    )
}
render(App)

if (module.hot) {
    module.hot.accept('./pages/app/app', () => {
        const NextApp = require('./pages/app/app').default
        render(NextApp)
    })
}