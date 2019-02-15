import React from "react";
import ReactDOM from 'react-dom';
import EventsComponent from "./components/EventsComponent.jsx";
import EventCountComponent from "./components/EventCountComponent.jsx";
import AdminPageComponent from "./components/adminpage.jsx"
import SignUPComponent from "./components/signuppage.jsx"

//ReactDOM.render(<EventCountComponent />, document.getElementById('eventCount'));
//ReactDOM.render(<AdminPageComponent />, document.getElementById('adminpage'));
//ReactDOM.render(<SignUPComponent />, document.getElementById('signUPPage'));
ReactDOM.render(<EventsComponent />, document.getElementById('events'));