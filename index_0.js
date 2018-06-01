const state = { // <- Redux-state
    counter: 0,
    name: 'Redux'
};
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state += 1;
        case "DECREMENT":
            return state -= 1;
        default: // edge-case2
            return state;
    }
};

const final = [ // <- Redux-Store
    {type: 'INCREMENT', value: 5}, // <- Actions
    {type: 'DECREMENT', value: 10},
    {type: 'DECREMENT', value: 40},
    {type: 'CHANGE_NAME', name: 'Redux'}
].reduce((finalState, current) => { // <- reducer

    if (current.type in ['INCREMENT', 'DECREMENT']) {
        finalState.counter = counterReducer(finalState.counter, current.type);
    }
    else if(current.type in ['CHANGE_NAME']) {
        finalState.name = nameReducer(finalState.name, current)
    }

    return finalState;
}, state);

console.log(final);
