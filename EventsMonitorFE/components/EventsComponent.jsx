import React from "react";

import ReactTable from "react-table";
import store from "../stores/store.js";
import {fetchEvents, fetchTimeInterval, clickOnDemandRefresh, fetchEventsCount, setSortValues, onEventsMonitorFilterButton} from "../rest/ajax.js";
//https://github.com/react-tools/react-table/issues/276
class EventsComponent extends React.Component {

  constructor(props) {
    super(props)

    store.subscribe(()=>{
      this.forceUpdate();
    });
    
    fetchTimeInterval()
    fetchEvents()
    fetchEventsCount()
    
    this.state = {
      data: [],
      pagesize: 5,
      previousvalue: "",
      fetchRows: "",
      fetchCount: ""
    }

    this.onSelect = (e) => {
      console.log(e.target.value);
      if (this.state.fetchRows == "") {
        this.state.fetchRows = setInterval(fetchEvents, e.target.value * 1000)
      } else {
        clearInterval(this.state.fetchRows)
        this.state.fetchRows = setInterval(fetchEvents, e.target.value * 1000)
      }

      if (this.state.fetchCount == "") {
        this.state.fetchCount = setInterval(fetchEventsCount, e.target.value * 1000)
      } else {
        clearInterval(this.state.fetchCount)
        this.state.fetchCount = setInterval(fetchEventsCount, e.target.value * 1000)
      }

    }
    // setting default refresh to 5 seconds
    this.state.fetchRows = setInterval(fetchEvents, 5000)
    this.state.fetchCount = setInterval(fetchEventsCount, 5000)
    this.fetchFilteredData = this.fetchFilteredData.bind(this)
    this.clickOnDemandRefresh =  this.clickOnDemandRefresh.bind(this)
    this.sortEventsMonitorTable = this.sortEventsMonitorTable.bind(this)
    this.onEventsMonitorFilter = this.onEventsMonitorFilter.bind(this)
    this.clickOnFilter = this.clickOnFilter.bind(this)
  };

  clickOnFilter() {
    if(store.getState().filterStatus) {
      onEventsMonitorFilterButton(false)
      this.refs.filter.textContent = 'Filter'
      this.clickOnDemandRefresh()
    } else {
      onEventsMonitorFilterButton(true)
      this.refs.filter.textContent = 'Remove Filter'
    }
  }
  
  fetchFilteredData(filter, row) {
    console.log(filter.Header)
    return (filter.id in row && row[filter.id].includes(filter.value))
  }

  sortEventsMonitorTable(newSorted, column, additive) {
    console.log("sortEventsMonitorTable ", newSorted)
    let clmnName = newSorted[0].id
    let sortByDesc = newSorted[0].desc
    setSortValues(clmnName, sortByDesc)
  }

  onEventsMonitorFilter(newFiltering, column, value) {
    console.log("in onEventsMonitorFilter")
    console.log(newFiltering)
    console.log(column)
    console.log(value)
    
    var filterMap = {}

    for (var keyValue of newFiltering){
      filterMap[keyValue.id] = keyValue.value
    }

    console.log('filterMap ', filterMap)
      

  }

  /*callPageChange(pageindex) {
    console.log("tsaf" ,this.state)
    console.log("hello", pageindex)
  }

  callOnPageSizeChange(pgsize) {
    console.log("in callOnPageSizeChange", pgsize)
    this.setState({
      data: this.state.data,
      previousvalue: this.state.previousvalue,
      pagesize: pgsize
    })
  }*/

  clickOnDemandRefresh () {
    fetchEvents()
    fetchEventsCount()
  }

  render() {
    const d =  []

    const c = [{
      Header: 'Event Id',
      accessor: 'id'
    }, {
      Header: 'Message',
      accessor: 'message'
    }, {
      Header: 'Event Type',
      accessor: 'type'
    }, {
      Header: 'IP Address',
      accessor: 'ipaddress'
    },{
      Header: 'Timestamp',
      accessor: 'timestamp'
    }]
    //https://www.ag-grid.com/best-react-data-grid/?gclid=EAIaIQobChMI4pS5jc2U4AIVixePCh0-jwmOEAAYASAAEgJfi_D_BwE
    return (
      <div>
        <div className="container" style={{width:'95%', marginLeft:'36px'}}>
        <h2 style={{textAlign:'center'}}>Events Monitor</h2>
          <pre style={{padding:'10px'}}>
            <button id="refresh" onClick={this.clickOnDemandRefresh} align="left" style={{marginRight:'6px'}} className="btn btn-primary">Refresh</button>
            <button id="filter" onClick={this.clickOnFilter} ref="filter" align="left" style={{marginRight:'25%'}} className="btn btn-primary">Filter</button>              
            <img src="/event/v1//imagefiles/info.png" style={{width:"18px"}}/>&nbsp; {store.getState().infoCount}
            <img src="/event/v1//imagefiles/warning.png" style={{width:"18px", marginLeft:'1%'}}/>&nbsp; {store.getState().warnCount}
            <img src="/event/v1//imagefiles/error.png" style={{width:"18px", marginLeft:'1%'}}/>&nbsp; {store.getState().errorCount}
            <span style={{marginLeft:'25%'}}>
              Refresh every&nbsp;
              <select onChange={this.onSelect} ref="selectTimeInterval">             
                  {store.getState().timeInterval.map(unit=>
                      <option key={unit} value={unit}>{unit}</option>
                  )}
          </select> seconds
            </span>
          </pre>
        </div>
        <div style={{paddingRight:'50px',paddingLeft:'50px'}}>
          <ReactTable data={store.getState().events} columns={c}
          showPagination={true}
          defaultPageSize={5}
          pages={5}
          filterable={store.getState().filterStatus}
          onSortedChange={this.sortEventsMonitorTable}
          //defaultFilterMethod={this.fetchFilteredData}
          //filterAll={true}
          //onPageChange={this.callPageChange}
          //onPageSizeChange={this.callOnPageSizeChange}
          //pagination - https://mdbootstrap.com/docs/react/tables/pagination/
          
          onFilteredChange={this.onEventsMonitorFilter}
          className="-striped -highlight"/>
        </div>
      </div>
    );
  }
}

export default EventsComponent;
