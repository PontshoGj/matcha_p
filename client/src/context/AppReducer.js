// eslint-disable-next-line 
export default (state, action) => {
    switch(action.type) {
        case 'DELETE_AUTH':
            localStorage.removeItem(action.payload)
            break
        case 'ADD_AUTH':
            localStorage.setItem("authorization", action.payload)
            break
        case 'SET_LOG':
            return{
                ...state,
                log: action.payload
            }
        case 'SET_STORAGE':
            localStorage.setItem("log", action.payload)
            break
        case 'GET_LOG':
            return{
                ...state,
                log: localStorage.getItem('log')
            }
        case 'SET_FIRST':
            localStorage.setItem('firstinput', action.payload)
            break
        case 'SET_ADMIN':
            localStorage.setItem('admin', action.payload)
            break
        case 'SET_ID':
            localStorage.setItem("id", action.payload)
            break
        default:
            return state;
    }
}