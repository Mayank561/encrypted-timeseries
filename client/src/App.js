import React from 'react';
import Chat1 from './chat/Chat1.js';
import ProcessComponent from "./process/Process"; // Changed the import name to avoid conflicts
import "./App.scss";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Home/home.js";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

function Appmain(props) {
  return (
    <React.Fragment>
      <div className='right'>
        {/* Updated the component name to Chat1 */}
        <Chat1
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
      <div className='left'>
        {/* Updated the component name to ProcessComponent */}
        <ProcessComponent />
      </div>
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <Home socket={socket} />
          </Route>
          {/* Corrected the prop name to component */}
          <Route path='/chat/:roomname/:username' component={Appmain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
