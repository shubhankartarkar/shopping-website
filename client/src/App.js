import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core'
import Main from './components/main'
import SideDrawer from './components/testComponents/drawer'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      {/* <Main/> */}
      <SideDrawer/>
    </div>
  );
}

export default App;
