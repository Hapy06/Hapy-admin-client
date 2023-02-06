import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconChecked from "../../globals/icons-components/IconChecked";
import IconNote from "../../globals/icons-components/IconNote";
import {
    CommandProcessModel,
    CommandProcessModelToShare,
    customStyles,
    HomeProcessModel
} from "../../globals/models/models";
import Modal from 'react-modal';
import Table_OpenTableModal from "./Table_OpenTableModal";
import {homeProcessContext} from "../HomeContainer";

function Table_Home(props) {
    const {commandProcess, setCommandProcess} = useContext<{commandProcess:CommandProcessModel,setCommandProcess:any}>(homeProcessContext) ;
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);



    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart="Quentin"
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd="LELOUCHE"
                           title="Gérer la table"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/home')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <span className="f-32 fw-6">Table {homeProcess.tableDetail.tableNumber}</span> <br/>
                <span className="f-20 fw-4">{homeProcess.tableDetail.zone?.name || homeProcess.tableDetail.zoneName || 'Zone Inconnue'}</span>
                <br/>
                <br/> <HapyButtonWithIcon text="Ouvrir la table" handleClick={()=>openModal()} iconComponent={<IconChecked/>} />
                <br/> <br/>
                <HapyButtonWithIcon text="Réserver la table" handleClick={()=>{navigate('/reservation/add')}} iconComponent={<IconNote/>} />
            </div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <Table_OpenTableModal handleCloseModal={closeModal}/>
                </Modal>
            </div>
        </>
    )
}
export default Table_Home