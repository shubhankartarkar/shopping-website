import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import Main from './components/main'

function App() {
  return (
    <div>
      <CssBaseline />
       <Main/>
      {/* <SideDrawer/> */}
    </div>
  );
}

export default App;
