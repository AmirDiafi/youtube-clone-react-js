import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as Worker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)

Worker.register()