
function reducer(state={
                        events:[], 
                        timeInterval:[], 
                        infoCount: 0, 
                        warnCount: 0, 
                        errorCount: 0,
                        sortColumn: "NA",
                        sortByDesc: false,
                        filterStatus: false}, 
                    action) {
    console.log("actiontype ", action.type)
    switch(action.type){
        case 'fetched':
         console.log("in reducer..");
         console.log(state.events)
            return {
                events: action.events,
                timeInterval: state.timeInterval,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                sortColumn: state.sortColumn,
                sortByDesc: state.sortByDesc,
                filterStatus: state.filterStatus
            }
        case 'actionTimeInterval':
            console.log("in action time ", state, action.timeInterval)
            return {
                events: state.events,
                timeInterval: action.timeInterval,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                sortColumn: state.sortColumn,
                sortByDesc: state.sortByDesc,
                filterStatus: state.filterStatus
            }        
        case 'fetchEventsCount':
            console.log("in fetchEventsCount reducer")
            return {
                events: state.events,
                timeInterval: state.timeInterval,
                infoCount: action.eventsCount[1].INFO,
                warnCount: action.eventsCount[2].WARNING,
                errorCount: action.eventsCount[0].ERROR,
                sortColumn: state.sortColumn,
                sortByDesc: state.sortByDesc,
                filterStatus: state.filterStatus
            }
        case 'sortColumns':
            console.log("in sortColumns reducer")
            return {
                events: action.events,
                timeInterval: state.timeInterval,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                sortColumn: action.sortColumn,
                sortByDesc: action.sortByDesc,
                filterStatus: state.filterStatus
            }
        case 'filterButtonClick':
            return {
                events: state.events,
                timeInterval: state.timeInterval,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                sortColumn: state.sortColumn,
                sortByDesc: state.sortByDesc,
                filterStatus: action.filterStatus
            }
        default:
            return state;
    }
}

export default reducer;