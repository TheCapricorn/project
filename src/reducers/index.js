import {combineReducers} from 'redux';
import appListDisplay from './appListDisplay';
import listReducers from  './listReducers';

const reducer = {
    go: (state = {index:0}, action) => {
        console.log('go-');
        switch (action.type){
            case 'go':
                console.log('go');
                return {...state,index:action.index}
                break;
            default:
                return state;
                break;

        }
    },
        appListDisplay
   /* appListDisplay: (state={display:true},action) => {
        console.log(state, action);
        if(typeof action.display == 'undefined'){
            return { ...state};
        }else{
            return { ...state,display: action.display};
        }


    }*/,
   list:combineReducers({...listReducers})
}
;
const appReducer = reducer;
export default appReducer