import store from '../stores/store.js';

function fetchEvents() {
    console.log("in fetch events..");
    var url = '../data/events1.json?sort='+store.getState().sortColumn+',desc='+store.getState().sortByDesc+'&page='+store.getState().page+'&limit='+store.getState().limit
    //var url = '/event/v1/events?sort='+store.getState().sortColumn+'&desc='+store.getState().sortByDesc+'&page='+store.getState().page+'&limit='+store.getState().defaultlimit
    return fetch(url).then(response => response.json()).then(jsonobj => {
        var events = jsonobj.events
        var totalSize = jsonobj.totalPageSize
        var f = store.getState().events
        /*if(f == undefined) {
            f = events
        } else {
            f.push.apply(f, events)
        }*/        
        store.dispatch({
            type: 'fetched',
            events: events,
            page: store.getState().page,
            limit: store.getState().defaultlimit,
            totalPages: totalSize
        })
    })
};

function fetchEventsForRefresh() {
    console.log("in fetch events..");
    var url = '../data/events1.json?sort='+store.getState().sortColumn+',desc='+store.getState().sortByDesc+'&page=0&limit=10'
    //var url = '/event/v1/events?sort=NA&desc='+store.getState().sortByDesc+'&page='+store.getState().page+'&limit='+store.getState().defaultlimit
    return fetch(url).then(response => response.json()).then(jsonobj => {
        var events = jsonobj.events
        var totalSize = jsonobj.totalPageSize
        store.dispatch({
            type: 'fetched',
            events: events,
            page: 0,
            limit: store.getState().defaultlimit,
            totalPages: totalSize
        })
    })
};

function fetchTimeInterval() {
    console.log("in fetchTimeInterval")
    const timeIntervalUnits = [1, 2, 3, 4, 5, 6]
    store.dispatch({
        type: 'actionTimeInterval',
        timeInterval: timeIntervalUnits
    });
};

function fetchEventsCount() {
    if(!store.getState().isLoginSuccess) {
        store.dispatch({
            type: "default"
        })
        return
    }
    console.log("in fetchEventsCount")
    //var url = '../data/eventscount.json'
    var url = 'http://localhost:8088/event/v1/countbytype'
    //var url = '/event/v1/countbytype'
    return fetch(url).then(response => response.json()).then(eventsCnt => {
        console.log(eventsCnt)
        console.log(eventsCnt[0].ERROR)
        store.dispatch({
            type: 'fetchEventsCount',
            infoCount: eventsCnt[1].INFO,
            warnCount: eventsCnt[2].WARNING,
            errorCount: eventsCnt[0].ERROR
        })
    })

}

function setSortValues(columnname, sortByDesc) {
    console.log("in setSortValues")
    store.dispatch({
        type: 'sortColumns',
        sortColumn: columnname,
        sortByDesc: sortByDesc,
        page: 0,
        limit: 0
    })    
}

function onEventsMonitorFilterButton(filterButtonStatus) {
    store.dispatch({
        type: 'filterButtonClick',
        filterStatus: filterButtonStatus
    })
}

function clickOnNext(start, pageSize) {
    store.dispatch({
        type: 'fetchNextSetOfRecords',
        page: start,
        limit: pageSize
    })
    console.log("done...")
}

export  {fetchEventsCount};