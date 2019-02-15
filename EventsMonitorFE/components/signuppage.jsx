import React from "react"
import {createUser} from "../rest/user.js"

class SignUPComponent extends React.Component {

    constructor(props) {
        super()
        this.signUP = this.signUP.bind(this)
    }

    signUP() {
        let signUPUserName = this.refs.signUPUsernameText.value
        let signUPPassword = this.refs.signUPPasswordText.value
        let signUPConfirmPassword = this.refs.signUPconfirmPasswordText.value
        console.log("Signup Username", signUPUserName)
        console.log("Signup Password", signUPPassword)
        console.log("Signup ConfirmPassword", signUPConfirmPassword)
        
        if (signUPPassword !== signUPConfirmPassword) {
            alert("Password should match")
            return false;
        } else {
            // Post call to create user
            createUser(signUPUserName, signUPPassword);
        }
        
    }

    componentDidMount() {
        this.props.signUPRefs(this.refs);
    }

    signUPBack() {
        document.getElementById("adminPageDiv").style.display = "block"
        document.getElementById("signUPPageDiv").style.display = "none"

        document.getElementById("usernameText").value = ""
        document.getElementById("passwordText").value = ""
    }

    render() {
        return (
            //<form action="" onSubmit={this.onSubmit}>
                <div className="container" id="signUPPageDiv" ref="signUPPageDiv" style={{paddingTop:"5%", display: "none"}}>
                    <h3>Create Events Monitor User</h3>
                    <div style={{paddingBottom: "1%"}}><input type="text" id="signUPUsernameText" ref="signUPUsernameText" placeholder="Enter login name" /></div>
                    <div style={{paddingBottom: "1%"}}><input type="text" id="signUPPasswordText" ref="signUPPasswordText" placeholder="Enter password" /></div>
                    <div><input type="text" id="signUPconfirmPasswordText" ref="signUPconfirmPasswordText" placeholder="Confirm" /></div>
                    <span style={{paddingRight:"1%"}}><button className="submitbutton" onClick={this.signUP} type="submit" ref="signUPPageButton">Create</button></span>
                    <span><button className="submitbutton" onClick={this.signUPBack} type="submit" ref="signUPPageBackButton">Login</button></span>
                </div>
            //</form>
        );
    }
}

export default SignUPComponent