import store from '../stores/store.js';

function infiniteScrollListener() {

    if(!store.getState().isLoginSuccess) {
        store.dispatch({
            type: "default"
        })
        return
    }

    //var url = "../data/events1.json"
    var isSortByASC = true;
    if(store.getState().sortBy == "desc") {
        isSortByASC = false;
    }
    //var url = "http://localhost:8088/event/v1/events?sort="+store.getState().sortColumn+"&desc="+isSortByASC+"&page="+store.getState().page+"&limit="+store.getState().limit+"&filter="+store.getState().filterValue
    var url = "https://localhost:8443/event/v1/events?sort="+store.getState().sortColumn+"&desc="+isSortByASC+"&page="+store.getState().page+"&limit="+store.getState().limit+"&filter="+store.getState().filterValue
    fetch(url, {
        headers: new Headers({
            "Authorization": store.getState().jwtToken
        })
    }).then(response => response.json()).then(events => {

        var stopInc = false

        if(store.getState().limit < events.length) {
            stopInc = true
        }        
        store.dispatch({
            type: "loadEvents",
            events: events,
            stopIncrement: stopInc
        })
        
    }).catch(err => {
        console.error(err)
    })
}

function onDemandRefresh() {
    if(!store.getState().isLoginSuccess) {
        store.dispatch({
            type: "default"
        })
        return
    }
    console.log("in onDemandRefresh")
    var currentPage = store.getState().page
    var noOfRows = 10
    if (currentPage > 0) {
        noOfRows = store.getState().page * 6
    }

    var isSortByASC = true;
    if(store.getState().sortBy == "desc") {
        isSortByASC = false;
    }
    var sortClm = store.getState().sortColumn
    if(sortClm == undefined) {
        sortClm = "id"
    }
    //var url = '../data/events1.json?sort='+store.getState().sortColumn+',desc='+store.getState().sortByDesc+'&page='+store.getState().page+'&limit='+store.getState().limit
    //var url = "http://localhost:8088/event/v1/events?sort="+sortClm+"&desc="+isSortByASC+"&page=0&limit="+noOfRows+"&filter="+store.getState().filterValue
    var url = "https://localhost:8443/event/v1/events?sort="+sortClm+"&desc="+isSortByASC+"&page=0&limit="+noOfRows+"&filter="+store.getState().filterValue
    return fetch(url, {
        headers: new Headers({
            "Authorization": store.getState().jwtToken
        })
    }).then(response => response.json()).then(events => {
        store.dispatch({
            type: 'onDemanRefresh',
            events: events,
            stopIncrement: false
        })
    })
}

function updatePage() {

    if (!store.getState().stopIncrement) {
        store.dispatch({
            type: "incrementPage",
            page: ++store.getState().page,
        })
    }
    
}

function handleSort(sortby, sortColmn) {
    if(!store.getState().isLoginSuccess) {
        store.dispatch({
            type: "default"
        })
        return
    }
    store.dispatch({
        type: "handleSort",
        sortBy: sortby,
        sortColumn: sortColmn,
        events: []
    });
    infiniteScrollListener()
}

export {handleSort, infiniteScrollListener, onDemandRefresh, updatePage}