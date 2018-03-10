/*eslint-disable import/default*/

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import {push} from "react-router-redux"
import routes from './routes';
import configureStore from './store/configureStore';
import './styles/main.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('root')
);
// window.onkeyup = function(e) {
//    var key = e.keyCode ? e.keyCode : e.which;
//
//    if (key == 79) {
//        store.dispatch(push("/opening"));
//    }else if (key == 67) {
//        store.dispatch(push("/purchase"));
//    }else if(key === 83){
//        store.dispatch(push("/sale"));
//    }
// }
