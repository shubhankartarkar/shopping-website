import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core'
import Main from './components/main'

function App() {
  return (
    <div className="App">
      <CssBaseline />
       <Main/>
      {/* <SideDrawer/> */}
    </div>
  );
}

export default App;
