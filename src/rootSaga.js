import { fork,takeEvery,take } from 'redux-saga/effects';
import {getList} from './saga/listSaga.js';
export default function* rootSaga() {
    yield takeEvery('appSagaListDisplay',getList);
    yield takeEvery('appList',function () {
        console.log(1111)
    });

}