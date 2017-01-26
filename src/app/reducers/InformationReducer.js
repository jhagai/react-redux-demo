import initialState from '../InitialState'

export default (state = initialState.information, action) => {
    if (action.type === 'INFORMATION-SUBMIT') {
        return action.information;
    }else if (action.type === 'INFORMATION-CITY') {
        return {...action.information, cities: action.cities};
    } else {
        return state;
    }
};