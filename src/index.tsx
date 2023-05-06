import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/app';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware  } from 'redux';
import { rootReducer } from './services/reducers/rootReducer';
import { HashRouter } from 'react-router-dom';

const composeEnhancers =
typeof window === 'object' &&
(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
      <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
