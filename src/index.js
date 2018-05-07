import './index.less';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import {LocaleProvider} from 'antd';
import appReducer from './reducers';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import history from './history/history'
import App from './App';
import Login from './components/page/login/login'
import Nopage from './components/page/404/nopage'
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './rootSaga';

moment.locale('zh-cn');

class Entry extends Component {
    render() {

        const sagaMiddleware = createSagaMiddleware();
        const store = createStore(
            combineReducers(
                {
                    ...appReducer,
                    router: routerReducer
                }
            ), {
                go: {
                    index: 0
                },
                 appListDisplay:{
                     display:true
                 }
            },
            compose(applyMiddleware(sagaMiddleware,routerMiddleware(history)),composeWithDevTools())
        );

        sagaMiddleware.run(rootSaga);
        return (
            <Provider store={store}>
                <LocaleProvider locale={zhCN}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to="/app"/>}/>
                            <Route path="/app" component={App}/>
                            <Route exact path="/login" component={Login}/>
                            <Route path='/404' component={Nopage}/>
                            <Route component={Nopage}/>
                        </Switch>
                    </Router>
                </LocaleProvider>
            </Provider>

        )
    }
}

ReactDOM.render(
    <Entry/>
    , document.getElementById('root')
);

/*hot(module)(Entry);
ReactDOM.render(
  <AppContainer>
    <Entry/>
  </AppContainer>
  , document.getElementById('root')
);*/
registerServiceWorker();
