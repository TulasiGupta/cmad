import React from "react";

import "react-table/react-table.css";
import store from "../stores/store.js";
import {fetchEventsCount} from "../rest/ajax.js";

class EventCountComponent extends React.Component{

    constructor(props) {
        super()
        store.subscribe(()=>{
            this.forceUpdate();
        });
        fetchEventsCount();    
    }

    updateCount() {
        this.state.error = store.getState().eventsCount.ERROR
    }

    render() {
        //console.log("store ", store.getState().eventsCount)
        return (
            <div>
                <p>
                    <img src="../imagefiles/info.png" width="18px"/>&nbsp; {store.getState().infoCount} &nbsp;&nbsp;
                    <img src="../imagefiles/warning.png" width="18px"/>&nbsp; {store.getState().warnCount} &nbsp;&nbsp;
                    <img src="../imagefiles/error.png" width="18px"/>&nbsp; {store.getState().errorCount} &nbsp;&nbsp;
                </p>
            </div>
        );
    }
    
}

export default EventCountComponent;
