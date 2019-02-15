import React from "react";
//https://www.npmjs.com/package/react-infinite-scroll-component
import store from "../stores/store.js";
//https://github.com/react-tools/react-table/issues/276
import {handleSort, infiniteScrollListener, updatePage} from "../rest/listeners.js"
import {logout} from "../rest/user.js"
import EventCountComponent from "../components/EventCountComponent.jsx"
import TimeInterval from "../components/EventsTimeInterval.jsx"
import EventsFilter from "../components/EventsFilter.jsx"
import AdminPageComponent from "../components/adminpage.jsx"
import SignUPComponent from "../components/signuppage.jsx"

import "../css/components.css"

class EventsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.getRefsFromChild = this.getRefsFromChild.bind(this);
    this.getSignUPRefs = this.getSignUPRefs.bind(this)
    store.subscribe(() => {
      this.forceUpdate();
    });
    if(store.getState().isLoginSuccess) {
      infiniteScrollListener();
    }
    this.state = {
        items: [],
        counter: 0
    };
    this.onLogout = this.onLogout.bind(this)
  }

  getRefsFromChild(childRefs) {
    this.setState({
      adminPageRefs: childRefs
    });
  }

  getSignUPRefs(childRefs) {
    this.setState({
      signUpPageRefs: childRefs
    })
  }

  displayItems() {
    var items = [];
    for (var i = 0; i < this.state.items; i++) {
      items.push(<li key={i}>Item {i}</li>);
    }
    return items;
  }

  onLogout() {
    this.state.adminPageRefs.usernameText.value = ""
    this.state.adminPageRefs.passwordText.value = ""

    this.state.signUpPageRefs.signUPUsernameText = ""
    this.state.signUpPageRefs.signUPPasswordText = ""
    this.state.signUpPageRefs.signUPconfirmPasswordText = ""
    logout()
  }

  componentDidMount() {
    this.refs.infiniteScroll.addEventListener("scroll", () => {
      console.log("this.refs.infiniteScroll.scrollTop ", this.refs.infiniteScroll.scrollTop)
      console.log("this.refs.infiniteScroll.clientHeight ", this.refs.infiniteScroll.clientHeight)
      console.log("this.refs.infiniteScroll.scrollHeight ", this.refs.infiniteScroll.scrollHeight)
      if ((this.refs.infiniteScroll.scrollTop + 
            this.refs.infiniteScroll.clientHeight) >= 
            this.refs.infiniteScroll.scrollHeight) {
              updatePage();
              infiniteScrollListener();
      }
    });
  } 

  render() {
    console.log("store.getState().styleDisplayAdminPage ", store.getState().styleDisplayAdminPage)
    return (
      <div>
        <div style={{display: store.getState().styleDisplayAdminPage}}>
              <div><AdminPageComponent credentialRefs={this.getRefsFromChild} ref="eventLoginPage"/></div>
              <div><SignUPComponent signUPRefs={this.getSignUPRefs} ref="eventsignUPPage"/></div>
        </div>
        <div style={{padding:"5%", algin:"center", position:"fixed"}} key="mainDivTable">
          <div style={{textAlign: "center", paddingBottom: "2%", display: store.getState().styleDisplayTools}}>
            <span>Logged in as </span><span style={{fontWeight: "bold"}}>admin</span>
            <button name="logoutBtn" className="btn-link" ref="logoutBtn" onClick={this.onLogout}>Logout</button>
          </div>
          <div>
            <div ref="tools" id="tools" style={{display: store.getState().styleDisplayTools}}>
              <div style={{float:"left"}}><TimeInterval timeInterval={[10, 20, 30, 40, 50, 60]}/></div>
              <div style={{float:"left", paddingLeft:"5%"}}><EventsFilter/></div>
              <div style={{paddingLeft:'45%', marginBottom:'10px'}}><EventCountComponent/></div>
            </div>
          </div>
          <div className="rTable" key="rTable1" style={{display: store.getState().styleDisplayTools}}>
            <div className="rTableRow" key="rTableRow1">
              <div className="rTableHead" key="headid" onClick={() => {
                if(this.refs.headerid.className == "sort-by-none") {
                  this.refs.headerid.className = "sort-by-asc"
                  this.refs.headerdescription.className = "sort-by-none"
                  this.refs.headerip.className = "sort-by-none"
                  this.refs.headertype.className = "sort-by-none"
                  this.refs.headerdate.className = "sort-by-none"
                  handleSort("asc", "id")
                }else if(this.refs.headerid.className == "sort-by-desc") {
                  this.refs.headerid.className = "sort-by-asc"
                  handleSort("asc", "id")
                } else {
                  this.refs.headerid.className = "sort-by-desc"
                  handleSort("desc", "id")
                }              
              }}>
                <span style={{fontWeight:"bold"}}>Event Id</span>
                <span ref="headerid" className="sort-by-asc"/>
              </div>
              <div className="rTableHead" key="headip" onClick={() => {
                  if(this.refs.headerip.className == "sort-by-none") {
                    this.refs.headerip.className = "sort-by-asc"
                    this.refs.headerid.className = "sort-by-none"
                    this.refs.headerdescription.className = "sort-by-none"
                    this.refs.headertype.className = "sort-by-none"
                    this.refs.headerdate.className = "sort-by-none"
                    handleSort("asc", "ipaddress")
                  }else if(this.refs.headerip.className == "sort-by-desc") {
                    this.refs.headerip.className = "sort-by-asc"
                    handleSort("asc", "ipaddress")
                  } else {
                    this.refs.headerip.className = "sort-by-desc"
                    handleSort("desc", "ipaddress")
                  }              
                }}>
                <span style={{fontWeight:"bold"}}>IP Address</span>
                <span ref="headerip" className="sort-by-none"/>
              </div>
              <div className="rTableHead" key="headdescription" onClick={() => {
                  if(this.refs.headerdescription.className == "sort-by-none") {
                    this.refs.headerdescription.className = "sort-by-asc"
                    this.refs.headerip.className = "sort-by-none"
                    this.refs.headerid.className = "sort-by-none"                  
                    this.refs.headertype.className = "sort-by-none"
                    this.refs.headerdate.className = "sort-by-none"
                    handleSort("asc", "message")
                  }else if(this.refs.headerdescription.className == "sort-by-desc") {
                    this.refs.headerdescription.className = "sort-by-asc"
                    handleSort("asc", "message")
                  } else {
                    this.refs.headerdescription.className = "sort-by-desc"
                    handleSort("desc", "message")
                  }              
                }}>
                <span style={{fontWeight:"bold"}}>Description</span>
                <span ref="headerdescription" className="sort-by-none"/>
              </div>
              <div className="rTableHead" key="headtype" onClick={() => {
                  if(this.refs.headertype.className == "sort-by-none") {
                    this.refs.headertype.className = "sort-by-asc"
                    this.refs.headerdescription.className = "sort-by-none"
                    this.refs.headerip.className = "sort-by-none"
                    this.refs.headerid.className = "sort-by-none"                                    
                    this.refs.headerdate.className = "sort-by-none"
                    handleSort("asc", "type")
                  }else if(this.refs.headertype.className == "sort-by-desc") {
                    this.refs.headertype.className = "sort-by-asc"
                    handleSort("asc", "type")
                  } else {
                    this.refs.headertype.className = "sort-by-desc"
                    handleSort("desc", "type")
                  }              
                }}>
                <span style={{fontWeight:"bold"}}>Severity</span>
                <span ref="headertype" className="sort-by-none"/>
              </div>
              <div className="rTableHead" key="headdate" onClick={() => {
                  if(this.refs.headerdate.className == "sort-by-none") {
                    this.refs.headerdate.className = "sort-by-asc"
                    this.refs.headertype.className = "sort-by-none"
                    this.refs.headerdescription.className = "sort-by-none"
                    this.refs.headerip.className = "sort-by-none"
                    this.refs.headerid.className = "sort-by-none"
                    handleSort("asc", "timestamp")
                  }else if(this.refs.headerdate.className == "sort-by-desc") {
                    this.refs.headerdate.className = "sort-by-asc"
                    handleSort("asc", "timestamp")
                  } else {
                    this.refs.headerdate .className = "sort-by-desc"
                    handleSort("desc", "timestamp")
                  }              
                }}>
                <span style={{fontWeight:"bold"}}>Time</span>
                <span ref="headerdate" className="sort-by-none"/>
              </div>
            </div>
          </div>
          <div className="tableHolder" ref="infiniteScroll" key="infiniteScroll" style={{display: store.getState().styleDisplayTools}}>
            <div style={{width:"102%"}} key="infiniteScroll1">            
                {store.getState().events.map(message =>
                      <div className="rTableRow" key={this.state.counter++}>
                        <div className="rTableCell" key={message.id}>{message.id}</div>
                        <div className="rTableCell" key={message.ipaddress}>{message.ipaddress}</div>
                        <div className="rTableCell" key={message.message}>{message.message}</div>
                        <div className="rTableCell" key={message.type}>{message.type}</div>
                        <div className="rTableCell" key={message.timestamp}>{message.timestamp}</div>
                    </div>
                )}                                 
            </div>
        </div>

        <div ref="iScroll" style={{ height: "200px", width: "200px", overflow: "auto"}}>
          <ul>
            {this.displayItems()}
          </ul>

          {this.state.loadingState ? <p className="loading"> loading More Items..</p> : ""}
        </div>
      </div>
    </div>
    );
  }
}
export default EventsComponent;
