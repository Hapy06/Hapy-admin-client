import React, {useEffect, useState} from 'react' ;
import {useNavigate} from "react-router";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import HapyTableItemCDR from "../../components/HapyTableItemCDR";
import IconArrowRight from "../../globals/icons-components/IconArrowRight";
import {ICONS} from "../../globals/Icons-svg";
import IconCloseSquare from "../../globals/icons-components/IconCloseSquare";
import HapyMobileTop from "../../components/HapyMobileTop";
import {getAdminProcessValues} from "../../globals/GlobalVariables";

function ChefDeRang03_ListTables(props) {
    const navigate = useNavigate();

    const listTables = [
        {number:1, state: 'taken'},
        {number:2, state: 'ask-to-open'},
        {number:3, state: 'taken'},
        {number:4, state: 'taken'},
        {number:5, state: 'taken'},
        {number:6, state: 'taken'},
        {number:7, state: 'taken'},
        {number:8, state: 'taken'},
        {number:9, state: 'ask-to-open'},
        {number:10, state: 'waiting-validation'},
        {number:11, state: 'taken'},
        {number:12, state: 'taken'},
        {number:13, state: 'free'},
        {number:14, state: 'taken'},
        {number:15, state: 'taken'},
        {number:16, state: 'waiting-validation'},
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "chef de rang"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "Hâpy"}
                           title="Liste des tables"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/home')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <div className="row table-item-container mt-3">
                    { listTables.map((table, index) => (<div key={index} className="col-3 mb-4"><HapyTableItemCDR tableNumber={table.number} tableState={table.state}/></div>)) }
                </div>
                <br/>
                <div className="text-center">
                    <span className="float-start"><IconArrowLeft width={32} height={32}/></span>
                    <span className="float-none fw-6">Terrasse Droite</span>
                    <span className="float-end"><IconArrowRight width={32} height={32}/></span>
                </div>
                <br/>
                <br/>
                <h6 className="fw-6">Légende</h6>
                <ul className="table-legende">
                    <li>
                        <span>{ICONS.tableFreeIcon}</span>
                        <span style={{marginLeft:10}}>Table Libre</span>
                    </li>
                    <li>
                        <span>{ICONS.tableWaitingIcon}</span>
                        <span style={{marginLeft:10}}>Commande en attente de validation</span>
                    </li>
                    <li>
                        <span>{ICONS.tableAskToOpenIcon}</span>
                        <span style={{marginLeft:10}}>Demande d’ouverture</span>
                    </li>
                    <li>
                        <span>{ICONS.tableTakenIcon}</span>
                        <span style={{marginLeft:10}}>Table occupée</span>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default ChefDeRang03_ListTables
