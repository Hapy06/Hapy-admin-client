import React from 'react' ;

type PropsType = {
    tableNumber: number ;
    tableStatus: 'close' | 'closed'  | 'unavailable' | 'command-waiting-validation' | 'ask-to-open'
        | 'command-preparation' | 'command-ready' | 'opened-and-served' | 'opened' | "waiting-to-join"  ;
}

function HapyTableItemCDR(props:PropsType) {

    const render = ()=>{
        switch (props.tableStatus) {
            case "close":
                return (<div style={{backgroundColor:'#EFEFEF', opacity:0.32}} className="table-item">{props.tableNumber}</div>) ;
            case "closed":
                return (<div style={{backgroundColor:'#EFEFEF', opacity:0.32}} className="table-item">{props.tableNumber}</div>) ;
            case "ask-to-open":
                return (<div style={{backgroundColor:'#EFEFEF', border: '2px solid #536DFE'}} className="table-item">{props.tableNumber}</div>) ;
            case "command-waiting-validation":
                return (<div style={{backgroundColor:'white',border: '2px solid #FF6063'}} className="table-item">{props.tableNumber}</div>) ;
            /*case "command-preparation":
                return (<div style={{backgroundColor:'#EFEFEF',border: '2px solid green'}} className="table-item">{props.tableNumber}</div>) ;*/
            case "opened":
                return (<div style={{backgroundColor:'white'}} className="table-item">{props.tableNumber}</div>) ;
            case "opened-and-served":
                return (<div style={{backgroundColor:'white'}} className="table-item">{props.tableNumber}</div>) ;
            case "unavailable":
                return (<div style={{backgroundColor:'#FF6063'}} className="table-item text-white">{props.tableNumber}</div>) ;
            default :
                return (<div style={{backgroundColor:'white'}} className="table-item">{props.tableNumber}</div>) ;
        }
    } ;

    return (
        render()
    )
}
export default HapyTableItemCDR
