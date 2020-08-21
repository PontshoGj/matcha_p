import React from 'react';
import './App.css';
import {Ui} from './components/Ui'
import {GlobalProvider} from './context/GlobalState'
function App() {
  // process.env.NODE_ENV = 'production'
  // new webpack.DefinePlugin({
  //   'process.env': {
  //       NODE_ENV: 'production'
  //   }
  // })
  console.log(process.env.NODE_ENV)
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
