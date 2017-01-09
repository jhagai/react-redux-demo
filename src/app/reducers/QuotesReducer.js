import initialState from '../InitialState'

export default (state = initialState.quotes, action) => {
    if (action.type === 'QUOTES-FETCHED') {
        return { ...state, fetched: action.quotes};
    }
    else if (action.type === 'QUOTES-SELECT') {
        return { ...state, selected: action.selected};
    }else {
        return state;
    }
};