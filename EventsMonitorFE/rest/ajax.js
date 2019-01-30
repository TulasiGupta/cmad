import store from '../stores/store.js';

function fetchEvents() {
    console.log("in fetch events..");
    //let url = '../data/events1.json?sort='+store.getState().sortColumn+',desc='+store.getState().sortByDesc
    var url = '/event/v1/events?sort='+store.getState().sortColumn+'&desc='+store.getState().sortByDesc
    return fetch(url).then(response => response.json()).then(events => {
        store.dispatch({
            type: 'fetched',
            events: events
        })
    })
};

function fetchTimeInterval() {
    console.log("in fetchTimeInterval")
    const timeIntervalUnits = [5, 10, 20, 30, 40, 50, 60]
    store.dispatch({
        type: 'actionTimeInterval',
        timeInterval: timeIntervalUnits
    });
};

function fetchEventsCount() {
    console.log("in fetchEventsCount")
    //let url = '../data/eventscount.json'
    var url = '/event/v1/countbytype'
    return fetch(url).then(response => response.json()).then(eventsCnt => {
        store.dispatch({
            type: 'fetchEventsCount',
            eventsCount: eventsCnt
        })
    })

}

function setSortValues(columnname, sortByDesc) {
    console.log("in setSortValues")
    //let url = '../data/filter_info.json?sort='+store.getState().sortColumn+',desc='+store.getState().sortByDesc
    var url = '/event/v1/events?sort='+store.getState().sortColumn+'&desc='+store.getState().sortByDesc
    return fetch(url).then(response => response.json()).then(events => {
        store.dispatch({
            type: 'sortColumns',
            events: events,
            sortColumn: columnname,
            sortByDesc: sortByDesc
        })
    })
}

function onEventsMonitorFilterButton(filterButtonStatus) {
    store.dispatch({
        type: 'filterButtonClick',
        filterStatus: filterButtonStatus
    })
}

export  {fetchEvents, fetchTimeInterval, fetchEventsCount, setSortValues, onEventsMonitorFilterButton};