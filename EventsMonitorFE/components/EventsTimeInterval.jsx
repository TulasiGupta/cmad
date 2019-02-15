import React from "react";
import store from "../stores/store.js";
import {onDemandRefresh} from "../rest/listeners.js"
import {fetchEventsCount} from "../rest/ajax.js"

class TimeInterval extends React.Component {

    constructor(props) {
        super()
        console.log("props.timeInterval ", props.timeInterval)

        if (typeof props.timeInterval == String) {
            props.timeInterval = Array.from(props.timeInterval)
        }
        this.state = {
            timeIntervalFrequency: []
        }
        
        this.onSelect = (e) => {            
            console.log("in onselect, new value will be set to ", e.target.value);
            clearInterval(store.getState().refreshCountObj)
            clearInterval(store.getState().refreshTableObj)
            var cntObj = setInterval(onDemandRefresh, e.target.value * 1000)   
            var tableObj = setInterval(fetchEventsCount, e.target.value * 1000)
            store.dispatch({
                type: 'updateTimeInterval',
                refreshCountObj: cntObj,
                refreshTableObj: tableObj
            })
        }
    }

    componentWillMount() {
        if(this.props.timeInterval == undefined) {
            this.setState({
                timeIntervalFrequency: [10, 20, 30, 40, 50, 60]
            })
        } else {
            this.setState({
                timeIntervalFrequency: this.props.timeInterval
            })
        }
          
    }

    componentDidMount() {        
        console.log("Selected Value after mount ", this.refs.selectTimeInterval.value)
        var tableObj = setInterval(onDemandRefresh, this.refs.selectTimeInterval.value * 1000)
        var countObj = setInterval(fetchEventsCount, this.refs.selectTimeInterval.value * 1000)
        store.dispatch({
            type: 'updateTimeInterval',
            refreshCountObj: countObj,
            refreshTableObj: tableObj
        })
        
    }

    componentWillUnmount() {
        clearInterval(store.getState().refreshCountObj)
        clearInterval(store.getState().refreshTableObj)
        this.setState({
            timeIntervalFrequency:[]
        })
    }

    render() {
        return(
            <div>
                Refresh every <select onChange={this.onSelect} ref="selectTimeInterval">             
                  {this.state.timeIntervalFrequency.map(timeUnit=>
                      <option key={timeUnit} value={timeUnit}>{timeUnit}</option>
                  )}
                </select> seconds
            </div>
        );
    }

}

export default TimeInterval;