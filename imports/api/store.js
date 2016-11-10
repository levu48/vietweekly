import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cmsApp from '../ui/reducers/cmsApp';


export let store = createStore(cmsApp, compose(applyMiddleware(thunk), 
            window.devToolsExtension ? window.devToolsExtension() : f => f));