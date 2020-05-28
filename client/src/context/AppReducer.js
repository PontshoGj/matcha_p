export default (state, action) => {
    switch(action.type) {
        case 'DELETE_AUTH':
            localStorage.removeItem(action.payload)
        case 'ADD_AUTH':
            localStorage.setItem("authorization", action.payload)
        case 'SET_LOG':
            return{
                ...state,
                log: action.payload
            }
        default:
            return state;
    }
}