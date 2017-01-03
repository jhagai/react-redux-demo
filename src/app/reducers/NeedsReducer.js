import initialState from '../InitialState'

export default (state = initialState.needs, action) => {
    if (action.type === 'NEEDS-SUBMIT') {
        return action.needs;
    } else {
        return state;
    }
};