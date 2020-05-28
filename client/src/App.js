import React, {useContext} from 'react';
import './App.css';
import {Ui} from './components/Ui'
import {GlobalProvider} from './context/GlobalState'
function App() {
  return (
    <GlobalProvider>
      <div 
        className="App"
      >
        <Ui />
      </div>
    </GlobalProvider>
  );
}

export default App;
