export default (state={display:true},action) => {
    console.log(state, action);
    switch (action.type){

        case 'appListDisplay':
            console.log('appListDisplay');
            return { ...state,display: action.display};
            break;
        default:
            return { ...state};
            break;
    }
}