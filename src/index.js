import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './model/store'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import annyang from 'annyang'
//import { SpeechKITT } from '../node_modules/speechkitt/src/speechkitt'

if (annyang) {
  annyang.setLanguage('zh-CN')
  //SpeechKITT.annyang();
  //SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css')
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
