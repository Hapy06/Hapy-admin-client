import React from 'react' ;

type PropsType = {
    tableNumber: number ;
    tableState: 'free' | 'waiting-validation' | 'ask-to-open' | 'taken' | string ;
}

function HapyTableItemCDR(props:PropsType) {

    const render = ()=>{
        switch (props.tableState) {
            case "free":
                return (<div style={{backgroundColor:'#EFEFEF'}} className="table-item">{props.tableNumber}</div>) ;
            case "ask-to-open":
                return (<div style={{backgroundColor:'#EFEFEF',border: '2px solid #00B0FF'}} className="table-item">{props.tableNumber}</div>) ;
            case "waiting-validation":
                return (<div style={{backgroundColor:'white',border: '2px solid #FF6063'}} className="table-item">{props.tableNumber}</div>) ;
            case "taken":
                return (<div style={{backgroundColor:'white'}} className="table-item">{props.tableNumber}</div>) ;
            default :
                return (<></>) ;
        }
    } ;

    return (
        render()
    )
}
export default HapyTableItemCDR
