import store from '../stores/store.js';
import {infiniteScrollListener} from "../rest/listeners.js"

function createUser(userName, password) {
    //var url = 'http://localhost:8088/event/v1/user'
    var url = 'https://localhost:8443/event/v1/user'
    console.log("in create user")
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },        
        body: JSON.stringify({
            userName: userName,
            password: password})
    }).then(response => response.json()).then((data) => {
        console.log("response ", data)
        var status = data.status
        if (status == undefined) {
            status = data.message
        }
        alert(status)
    })
}

function loginUser(userName, password) {
    //var url = 'http://localhost:8088/event/v1/login'
    var url = 'https://localhost:8443/event/v1/login'
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },        
        body: JSON.stringify({
            name: userName,
            password: password})
    }).then(response => {
        console.log("response ", response)
        var status = response.status
        console.log(status)
        if(status === 200) {
            let jwtToken = response.headers.get("Authorization")
            store.dispatch({
                type: "styleAdminPage",
                isLoginSuccess: true,
                loggedInUser: userName,
                jwtToken: jwtToken
            })
            infiniteScrollListener()
        } else {
            alert("Login unsuccessful")
        }
        /*if (status == undefined) {
            status = data.message
        }
        if(status === "True") {
            //alert("Login successful")
            store.dispatch({
                type: "styleAdminPage",
                isLoginSuccess: true
            })
            infiniteScrollListener()
        } else {
            alert("Login unsuccessful")
        }*/
        
    })
}

/*function loginUser(userName, password) {
    //var url = 'http://localhost:8088/event/v1/login'
    var url = 'https://localhost:8443/event/v1/login'
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",            
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*"
        },        
        body: JSON.stringify({
            name: userName,
            password: password})
    }).then(response => {
        response.headers.forEach(console.log);
        console.log(response.headers.get("max-age"))
        console.log(response.headers.get("Authorization"))
        console.log(response.headers.get("Authorization"))
    })
}*/

function logout() {
    store.dispatch({
        type: "reset"
    })
}

export {createUser, loginUser, logout}