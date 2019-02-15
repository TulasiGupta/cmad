import store from '../stores/store.js';
import {infiniteScrollListener} from "../rest/listeners.js"

function createUser(userName, password) {
    var url = 'http://localhost:8088/event/v1/user'
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
    var url = 'http://localhost:8088/event/v1/login'
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
        if(status === "True") {
            //alert("Login successful")
            store.dispatch({
                type: "styleAdminPage",
                isLoginSuccess: true
            })
            infiniteScrollListener()
        } else {
            alert("Login unsuccessful")
        }
        
    })
}

function logout() {
    this.refs. 
    store.dispatch({
        type: "reset"
    })
}

export {createUser, loginUser, logout}