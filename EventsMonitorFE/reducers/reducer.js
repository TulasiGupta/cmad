import store from "../stores/store";

function reducer(state={events:[], 
                        infoCount: 0, 
                        warnCount: 0, 
                        errorCount: 0,
                        page: 0,
                        limit: 6,
                        sortBy: "desc",
                        sortColumn: "id",
                        stopIncrement: false,
                        refreshCountObj: undefined,
                        refreshTableObj: undefined,
                        filterValue: "NA",
                        defaultValueForPlaceHolder: "Type text to search",
                        styleDisplayTools: "none",
                        styleDisplayAdminPage: "block",
                        isLoginSuccess: false}, action) {
    console.log("actiontype ", action)
    switch(action.type){
        case 'onDemanRefresh':
            var islogin = false
            var displaytools = "none"
            var displayadmin = "block"
            var evnts = []
            if(store.getState().isLoginSuccess) {
                islogin = true
                displaytools = "block"
                displayadmin = "none"
                evnts = action.events
            }
            return({
                events: evnts,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                page: state.page,
                limit: state.limit,
                sortBy: state.sortBy,
                sortColumn: state.sortColumn,
                stopIncrement: action.stopIncrement,
                refreshCountObj: state.refreshCountObj,
                refreshTableObj: state.refreshTableObj,
                filterValue: state.filterValue,
                defaultValueForPlaceHolder: state.defaultValueForPlaceHolder,
                styleDisplayTools: displaytools,
                styleDisplayAdminPage: displayadmin,
                isLoginSuccess: islogin
            }) 
        case 'loadEvents': 
            var islogin = false
            var displaytools = "none"
            var displayadmin = "block"
            var evnts = []
            if(store.getState().isLoginSuccess) {
                console.log("in loaddloadEventsloadEventsloadEvents")
                islogin = true
                displaytools = "block"
                displayadmin = "none"
                evnts = state.events.concat(action.events)
            }           
            return({
                events: evnts,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                page: state.page,
                limit: state.limit,
                sortBy: state.sortBy,
                sortColumn: state.sortColumn,
                stopIncrement: action.stopIncrement,
                refreshCountObj: state.refreshCountObj,
                refreshTableObj: state.refreshTableObj,
                filterValue: state.filterValue,
                defaultValueForPlaceHolder: state.defaultValueForPlaceHolder,
                styleDisplayTools: displaytools,
                styleDisplayAdminPage: displayadmin,
                isLoginSuccess: islogin
            })            
        case 'fetchEventsCount':
            var islogin = false
            var displaytools = "none"
            var displayadmin = "block"
            var icount = 0
            var ecount = 0
            var wcount = 0
            if(store.getState().isLoginSuccess) {
                islogin = true
                displaytools = "block"
                displayadmin = "none"
                icount = action.infoCount,
                wcount = action.warnCount,
                ecount = action.errorCount
            }
            return({
                events: state.events,
                infoCount: icount,
                warnCount: wcount,
                errorCount: ecount,
                page: state.page,
                limit: state.limit,
                sortBy: state.sortBy,
                sortColumn: state.sortColumn,
                stopIncrement: state.stopIncrement,
                refreshCountObj: state.refreshCountObj,
                refreshTableObj: state.refreshTableObj,
                filterValue: state.filterValue,
                defaultValueForPlaceHolder: state.defaultValueForPlaceHolder,
                styleDisplayTools: displaytools,
                styleDisplayAdminPage: displayadmin,
                isLoginSuccess: islogin
            })
        case 'handleSort':            
            return({
                events: action.events,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                page: 0,
                limit: state.limit,
                sortBy: action.sortBy,
                sortColumn: action.sortColumn,
                stopIncrement: state.stopIncrement, 
                refreshCountObj: state.refreshCountObj,
                refreshTableObj: state.refreshTableObj,
                filterValue: state.filterValue,
                defaultValueForPlaceHolder: state.defaultValueForPlaceHolder,
                styleDisplayTools: state.styleDisplayTools,
                styleDisplayAdminPage: state.styleDisplayAdminPage,
                isLoginSuccess: state.isLoginSuccess
            })
        case 'incrementPage':
            var islogin = false
            var displaytools = "none"
            var displayadmin = "block"
            if(store.getState().isLoginSuccess) {
                islogin = true
                displaytools = "block"
                displayadmin = "none"
            }
            return({
                events: state.events,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                page: action.page,
                limit: state.limit,
                sortBy: state.sortBy,
                sortColumn: state.sortColumn,
                stopIncrement: state.stopIncrement, 
                refreshCountObj: state.refreshCountObj,
                refreshTableObj: state.refreshTableObj,
                filterValue: state.filterValue,
                defaultValueForPlaceHolder: state.defaultValueForPlaceHolder,
                styleDisplayTools: displaytools,
                styleDisplayAdminPage: displayadmin,
                isLoginSuccess: islogin
            })
        case 'updateTimeInterval':
            
            return({
                events: state.events,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                page: state.page,
                limit: state.limit,
                sortBy: state.sortBy,
                sortColumn: state.sortColumn,
                stopIncrement: state.stopIncrement, 
                refreshCountObj: action.refreshCountObj,
                refreshTableObj: action.refreshTableObj,
                filterValue: state.filterValue,
                defaultValueForPlaceHolder: state.defaultValueForPlaceHolder,
                styleDisplayTools: state.styleDisplayTools,
                styleDisplayAdminPage: state.styleDisplayAdminPage,
                isLoginSuccess: state.isLoginSuccess
            })
        case 'filter':            
            return({
                events: state.events,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                page: state.page,
                limit: state.limit,
                sortBy: state.sortBy,
                sortColumn: state.sortColumn,
                stopIncrement: state.stopIncrement, 
                refreshCountObj: state.refreshCountObj,
                refreshTableObj: state.refreshTableObj,
                filterValue: action.filterValue,
                defaultValueForPlaceHolder: action.defaultValueForPlaceHolder,
                styleDisplayTools: state.styleDisplayTools,
                styleDisplayAdminPage: state.styleDisplayAdminPage,
                isLoginSuccess: state.isLoginSuccess
            })
        case 'styleAdminPage':
            var islogin = false
            var displaytools = "none"
            var displayadmin = "block"
            if(action.isLoginSuccess) {
                islogin = true
                displaytools = "block"
                displayadmin = "none"
            }
            return({
                events: state.events,
                infoCount: state.infoCount,
                warnCount: state.warnCount,
                errorCount: state.errorCount,
                page: state.page,
                limit: state.limit,
                sortBy: state.sortBy,
                sortColumn: state.sortColumn,
                stopIncrement: state.stopIncrement, 
                refreshCountObj: state.refreshCountObj,
                refreshTableObj: state.refreshTableObj,
                filterValue: state.filterValue,
                defaultValueForPlaceHolder: state.defaultValueForPlaceHolder,
                styleDisplayTools: displaytools,
                styleDisplayAdminPage: displayadmin,
                isLoginSuccess: action.isLoginSuccess
            })
        case 'reset':            
            return({
                events: [],
                infoCount: 0,
                warnCount: 0,
                errorCount: 0,
                page: 0,
                limit: 6,
                sortBy: "desc",
                sortColumn: "id",
                stopIncrement: false, 
                refreshCountObj: undefined,
                refreshTableObj: undefined,
                filterValue: "NA",
                defaultValueForPlaceHolder: "Type text to search",
                styleDisplayTools: "none",
                styleDisplayAdminPage: "block",
                isLoginSuccess: false
            })
        default:
            return state;
    }
}

export default reducer;