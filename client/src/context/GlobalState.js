// eslint-disable-next-line 
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
// Initial state
const initialState = {
  log:  false
}
// Create context
export const GlobalContext = createContext(initialState);
// Provider component
export const GlobalProvider = ({ children }) => {
  // eslint-disable-next-line 
  const [state, dispatch] = useReducer(AppReducer, initialState);
  // Actions
  function deleteAuth(authorization) {
    dispatch({
      type: 'DELETE_AUTH',
      payload: authorization
    });
  }
  function addAuth(token) {
    dispatch({
      type: 'ADD_AUTH',
      payload: token
    });
  }
  function setLog(logs){
    dispatch({
      type: 'SET_LOG',
      payload: logs
    })
  }
  function setLogStorage(logs){
    dispatch({
      type: 'SET_STORAGE',
      payload: logs
    })
  }
  function getLog(){
    dispatch({
      type: 'GET_LOG'
    })
  }
  function setId(id){
    dispatch({
      type: 'SET_ID',
      payload: id
    })
  }
  function setFirstInput(logs){
    dispatch({
      type: 'SET_FIRST',
      payload: logs
    })
  }
  function setAdmin(logs){
    dispatch({
      type: 'SET_ADMIN',
      payload: logs
    })
  }

  return (<GlobalContext.Provider value={{
    // log: state.log,
    deleteAuth,
    addAuth,
    setLog,
    getLog,
    setLogStorage,
    setFirstInput,
    setAdmin,
    setId
  }}>
    {children}
  </GlobalContext.Provider>);
}