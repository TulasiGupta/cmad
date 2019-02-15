import React from "react"
import {loginUser} from "../rest/user.js"
import store from "../stores/store.js";
//https://github.com/axios/axios/issues/569

class AdminPageComponent extends React.Component {

    constructor(props) {
        super()
        store.subscribe(() => {
            this.forceUpdate();
        });
        this.loginCheck = this.loginCheck.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    componentDidMount() {
        this.props.credentialRefs(this.refs);
    }

    loginCheck() {
        let username = this.refs.usernameText.value
        let password =  this.refs.passwordText.value
        loginUser(username, password)
    }

    onRegister() {
        document.getElementById("adminPageDiv").style.display = "none"
        document.getElementById("signUPPageDiv").style.display = "block"

        document.getElementById("signUPUsernameText").value = ""
        document.getElementById("signUPPasswordText").value = ""
        document.getElementById("signUPconfirmPasswordText").value = ""
    }

    onSubmit(e) {
        // this will stop the form submission by default
        e.preventDefault();
    }

    render() {
        console.log("AAAAA ", store.getState().loginUserPlaceHolder)
        return (
            <form action="" onSubmit={this.onSubmit} onLoad={this.onAdminLoad}>
                <div className="container" id="adminPageDiv" ref="adminPageDiv" style={{paddingTop:"5%"}}>
                    <h3>Login</h3>
                    <div style={{paddingBottom: "1%"}}><input type="text" id="usernameText" ref="usernameText" placeholder="Enter Username"/></div>
                    <div><input type="text" ref="passwordText" id="passwordText" placeholder="Enter Password"/></div>
                    <div>
                        <span style={{paddingRight:"1%"}}><button className="submitbutton" onClick={this.loginCheck} type="submit" ref="adminPageButton">Login</button></span>
                        <span><button className="submitbutton" onClick={this.onRegister} type="submit" ref="adminSignUPButton">Register</button></span>
                    </div>
                </div>
            </form>
        );
    }
}

export default AdminPageComponent