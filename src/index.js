import './index.less';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Redirect} from 'react-router-dom'
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import history from './history/history'
import App from './App';
import Login from './components/page/login/login'
import Nopage from './components/page/404/nopage'
import registerServiceWorker from './registerServiceWorker';

moment.locale('zh-cn');

class Entry extends Component {
  render() {
    return (
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
