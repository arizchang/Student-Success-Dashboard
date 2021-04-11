/*
 * @Author: your name
 * @Date: 2021-04-04 22:09:43
 * @LastEditTime: 2021-04-10 20:04:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Student-Success\frontend\Student-success-dashboard-new\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/app';
import 'antd/dist/antd.css';
// import 'bulma/css/bulma.css'




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