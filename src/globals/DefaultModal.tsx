import React, {useState} from 'react';
import Modal from 'react-modal';
import IconArrowLeft from "../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../globals/icons-components/IconHapyLogo";
import HapyButtonWithIcon from "../components/HapyButtonWithIcon";
import IconVerify from "../globals/icons-components/IconVerify";

type PropsType = {
    handleCloseModal: any ;
}

function ClientTipsModal(props:PropsType) {

    const [tipsValidated, setTipsValidated] = useState(false);

    return (
                <>
                    <button className="back-btn-modal" style={{float: "left", marginTop:-5}}
                            onClick={props.handleCloseModal}>
                        <IconArrowLeft width={24} height={24} styleIcon={{marginLeft:5}} />
                    </button>
                    <br/><br/><br/>
                    <p className="text-black"><span className="text-blue">#</span> 27</p>
                    <h1 className="text-black f-32 fw-6">Rendre le serveur <br/> Hâpy</h1>
                    <div className="text-center mt-4 mb-4">
                        <IconHapyLogo width={48} height={48} styleIcon={{width:22}}/>
                    </div>
                    <div>
                        /*Content*/
                    </div>
                    <br/><br/><br/>
                    <HapyButtonWithIcon text="Valider le tips" handleClick={()=>setTipsValidated(true)}
                                        iconComponent={<IconVerify/>}/>
                </>
    )
}
export default ClientTipsModal
