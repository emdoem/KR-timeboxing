import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/App";
import "./styles/main.scss"

import { store } from './components/reduxStore';
import {Provider} from 'react-redux';
// export const StoreContext = React.createContext({ store: null })


ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , document.getElementById("root")
);
