import {call, put,select} from 'redux-saga/effects';
import {push} from 'react-router-redux'
import service from '@/service';


const {getAppList} = service;

export function* getList() {
    try {
        const state = yield  select();
        console.log(state);
        yield put({type:'appListDisplay',display:false});
        const res = yield call(getAppList, {});
        console.log(res);
    } catch (e) {
        yield put(push('/app/usercenter/rolecontroller/rolelist'))
    }

    console.log('service');
}