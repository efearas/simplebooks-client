export default function reducer(initialState, action) {

    let newState = {};
    
    switch (action.type) {
     
        case 'SET_MESSAGE':
            
            newState = { ...initialState, messageOptions: action.value };
            return newState;

        default:
            return initialState;
    }
}
