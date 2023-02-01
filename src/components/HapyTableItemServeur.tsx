import React from 'react' ;

type PropsType = {
    tableNumber: number ;
    tableState: 'close' | 'closed' | 'command-waiting-validation'
        | 'command-preparation' | 'command-ready' | 'opened-and-served' | 'opened' | "waiting-to-join" | string ;
}

function HapyTableItemServeur(props:PropsType) {

    const render = ()=>{
        switch (props.tableState) {
            case "opened-and-served" :
                return (<div style={{backgroundColor:'white'}} className="table-item">{props.tableNumber}</div>) ;
            case "waiting-to-join" :
                return (<div style={{backgroundColor:'white'}} className="table-item">{props.tableNumber}</div>) ;
            case "opened" :
                return (<div style={{backgroundColor:'white'}} className="table-item">{props.tableNumber}</div>) ;
            case "close" :
                return (<div style={{backgroundColor:'#EFEFEF'}} className="table-item">{props.tableNumber}</div>) ;
            case "closed" :
                return (<div style={{backgroundColor:'#EFEFEF'}} className="table-item">{props.tableNumber}</div>) ;
            case "command-waiting-validation":
                return (<div style={{backgroundColor:'white',border: '2px solid #FF6063'}} className="table-item">{props.tableNumber}</div>) ;
            case "command-preparation":
                return (<div style={{backgroundColor:'white',border: '2px solid #F7B927'}} className="table-item">{props.tableNumber}</div>) ;
            case "command-ready":
                return (<div style={{backgroundColor:'white',border: '2px solid #00B0FF'}} className="table-item">{props.tableNumber}</div>) ;
            default :
                return (<div style={{backgroundColor:'#EFEFEF'}} className="table-item">{props.tableNumber}</div>) ;
        }
    } ;

    return (
        render()
    )
}
export default HapyTableItemServeur
