import React from "react";
import store from "../stores/store.js";
import {onDemandRefresh, updatePage} from "../rest/listeners.js"
import {fetchEventsCount} from "../rest/ajax.js"

class EventsFilter extends React.Component {

    constructor(props) {
        super()
        this.onSearchClick = this.onSearchClick.bind(this)
    }

    onSearchClick() {
        console.log("onSearchClick")
        if(this.refs.filterBtn.innerHTML == "Filter") {
            store.dispatch({
                type: 'filter',
                filterValue: this.refs.eventsSearchText.value
            })
            this.setState({
                defaultValue: this.refs.eventsSearchText.value
            })
            this.refs.filterBtn.innerHTML = "Clear Filter"
        } else {
            store.dispatch({
                type: 'filter',
                filterValue: "NA"
            })
            this.refs.eventsSearchText.value = ""
            this.refs.filterBtn.innerHTML = "Filter"
        }
        onDemandRefresh();
        updatePage();
    }
    
    render() {
        return(
            <div>
                Search <input type="text" name="eventsTextSearch" ref="eventsSearchText" placeholder="Type text to Search"/>
                <button name="eventsButton" className="btn-link" ref="filterBtn" onClick={this.onSearchClick}>Filter</button>
            </div>
        );
    }

}

export default EventsFilter;