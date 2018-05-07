import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

// import home from '../components/home/home'

import userlist from '../components/page/usercenter/usercontroller/userlist'
import orgmenulist from '../components/page/usercenter/orgmenucontroller/orgmenulist/orgmenulist'
import orggroup from '../components/page/usercenter/orgmenucontroller/orggroup/orggroup'
import rolelist from '../components/page/usercenter/rolecontroller/rolelist'
import authlist from '../components/page/usercenter/authcontroller/authlist/authlist'

import authSet from '../components/page/usercenter/rolecontroller/authset' //unique

import menulist from '../components/page/systemset/funcontroller/menucontroller/menulist'    //wj
import buttonlist from '../components/page/systemset/funcontroller/buttoncontroller/buttonlist'  //wj

import newapp from '../components/page/systemset/appcontroller/newapp/newapp'  //wj
import applist from '../components/page/systemset/appcontroller/applist/applist'  //wj

import newmodular from '../components/page/systemset/modcontroller/newmodular/newmodular'  //wj
import modularlist from '../components/page/systemset/modcontroller/modularlist/modularlist'  //wj

export default class Myroute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/app' render={() => <Redirect to='/app/systemset/appcontroller/applist'/>}/>
                {/*<Route exact path='/app' component={home}/>*/}
                <Route exact path='/app/usercenter/usercontroller/userlist' component={userlist}/>
                {/*<Route exact path='/app/usercenter/usercontroller/useradd' component={useradd}/>*/}
                <Route exact path='/app/usercenter/rolecontroller/rolelist' component={rolelist}/>
                <Route exact path='/app/usercenter/orgmenucontroller/orgmenulist' component={orgmenulist}/>
                <Route exact path='/app/usercenter/orgmenucontroller/orggroup' component={orggroup}/>
                <Route exact path='/app/usercenter/authcontroller/authlist' component={authlist}/>

                <Route exact path='/app/usercenter/authcontroller/authset' component={authSet}/>

                <Route exact path='/app/systemset/funcontroller/menulist' component={menulist}/>
                <Route exact path='/app/systemset/funcontroller/buttonlist' component={buttonlist}/>

                <Route exact path='/app/systemset/appcontroller/applist' component={applist}/>
                <Route exact path='/app/systemset/modcontroller/newmodular' component={newmodular}/>
                <Route exact path='/app/systemset/modcontroller/modularlist' component={modularlist}/>

                <Route render={() => <Redirect to="/404"/>}/>
            </Switch>
        )
    }
}
