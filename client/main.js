import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cmsApp from '../imports/ui/reducers/cmsApp';
import {Router, Route, Redirect, IndexRoute, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import App from '../imports/ui/app/App.jsx';
import GoogleSearch from '../imports/ui/app/GoogleSearch.jsx';
import ReutersRss from '../imports/testing/ReutersRss.jsx';
import Admin from '../imports/ui/app/admin/Admin.jsx';
import '../imports/startup/accounts-config';
import {store} from '../imports/api/store';
import YouTubeUploader from '../imports/ui/components/YouTubeUploader.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

Meteor.startup(() => {
   render(
       <Provider store={store}>
            <Router history={useRouterHistory(createHashHistory)({})} onUpdate={() => window.scrollTo(0,0)} >
                <Route path='/' component={App} />
                <Route path='/admin' component={Admin} />
                <Route path='/search' component={GoogleSearch} />
                <Route path='/samples/oauth2/oauth2callback' component={YouTubeUploader} />
            </Router>
        </Provider>
        , document.getElementById('app')
   );  
});


