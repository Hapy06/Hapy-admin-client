import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconUser from "../../globals/icons-components/IconUser";
import IconChecked from "../../globals/icons-components/IconChecked";
import IconOrder from "../../globals/icons-components/IconOrder";
import IconNote from "../../globals/icons-components/IconNote";
import IconReservationAdd from "../../globals/icons-components/IconReservationAdd";
import {CommandProcessModel, CommandProcessModelToShare, HomeProcessModel} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";
import {
    API_REQUEST_CATEGORY_ON_MENU,
    getAdminProcessValues,
    getRequest, MSG_ERROR_LOADING,
    setProcessStored
} from "../../globals/GlobalVariables";

function Table_TableOpened(props) {
    const {homeProcess, setHomeProcess} = useContext<{ homeProcess: HomeProcessModel, setHomeProcess: any }>(homeProcessContext);
    const {commandProcess, setCommandProcess} = useContext<{ commandProcess: CommandProcessModel, setCommandProcess: any }>(homeProcessContext);
    const [numberOfPerson, setNumberOfPerson] = useState<number>(1);
    const navigate = useNavigate();
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');


        useEffect(() => {
            console.log(homeProcess) ;
            let temp: CommandProcessModel = {...commandProcess};
            if (homeProcess.tableDetail.commandProcessToShare) {
                let commandProcessModelToShare: CommandProcessModelToShare = JSON.parse(homeProcess.tableDetail.commandProcessToShare);
                for (let key in commandProcessModelToShare) {
                    temp[key] = commandProcessModelToShare[key]
                }
            }
                temp.table = homeProcess.tableDetail;
                temp.table.institution = getAdminProcessValues("userLogged").institution;
                temp.institution = getAdminProcessValues("userLogged").institution;
                console.log(temp);
                setNumberOfPerson(temp.numberOfPerson);
                setCommandProcess({...temp});
                setProcessStored("commandProcess", temp) ;
        }, []);

        const handleCommandClick = () => {
            // console.log(commandProcess) ;
            if (!commandProcess.categoriesOnMenu || commandProcess.categoriesOnMenu?.length == 0) {
                showErrorFunction("Chargement des commandes...", "text-success", 10000);
                getRequest(API_REQUEST_CATEGORY_ON_MENU + '/instittion-id/list?institutionId=' + commandProcess.institution.id,
                    (res) => {
                        let temp = {...commandProcess};
                        temp.productCategories = [];
                        temp.products = [];
                        temp.variants = [];
                        let listCM = res.data.data.items.filter((elt => {
                            return elt.productCategories.length > 0
                        }));
                        listCM.forEach(categoryOnMenu => {
                            categoryOnMenu.productCategories.forEach(productCategory => {
                                if (productCategory.products.length == 0) {
                                    listCM = listCM.filter(elt => elt.id != categoryOnMenu.id);
                                } else {
                                    productCategory.products.forEach(product => {
                                        if (product.variants.length == 0) { // no variant present, so remove
                                            listCM = listCM.filter(elt => elt.id != categoryOnMenu.id);
                                        } else { // minimum 1 variant present, so keep
                                            temp.products.push(product);
                                            temp.variants = temp.variants.concat(product.variants);
                                        }
                                    })
                                }
                            })
                        });
                        listCM.forEach(CM => {
                            temp.productCategories = temp.productCategories.concat(CM.productCategories)
                        });
                        temp.categoriesOnMenu = [...listCM];
                        setCommandProcess({...temp});
                        setProcessStored("commandProcess", temp);
                        console.log(temp);
                        navigate('/command');
                    },
                    (err) => {
                        showErrorFunction(MSG_ERROR_LOADING)
                    });
            } else {
                navigate('/command');
            }
        };

        const showErrorFunction = (errorMessage: string, color: 'text-success' | 'text-danger' = "text-danger", timeout: number = 2000) => {
            setErrorMessageColor(color);
            setErrorMessage(errorMessage);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, timeout);
        };

        return (
            <>
                <HapyMobileTop showWelcome2AndMenu={false}
                               subtitleStart="Quentin"
                               subtitleStartClassName="text-red-orange"
                               subtitleEnd="LELOUCHE"
                               title="Gérer la table"
                               showBtnBack={true}
                               handleClickBtnBack={() => navigate('/home')}
                               showRightSideBtn={false}
                               hapyLogoBtnColor={"#FF6063"}
                />
                <div className="happy-div-bottom">
                    <div className="row">
                        <span className="col-9 f-32 fw-5">Table {homeProcess.tableDetail.tableNumber}</span>
                        <div className="col-3 text-center" style={{marginTop: -20}}>
                            <IconUser width={16} height={16} styleIcon={{width: 16}}/>
                            <div className="f-16" style={{marginTop: -10}}>
                                {/*<span onClick={()=>setNumberOfPerson(numberOfPerson+1)}>+</span>*/}
                                <span className="text-red-orange ml-2 mr-2 fw-6">{numberOfPerson}</span>
                                {/*<span onClick={()=>{numberOfPerson > 1 ? setNumberOfPerson(numberOfPerson-1) : null}}>-</span>*/}
                            </div>
                        </div>
                    </div>
                    <span className="f-20 fw-4">{homeProcess.tableDetail?.zoneName || 'Zone Inconnue'}</span>
                    <br/><br/>
                    <div className="ml-3">
                        <IconChecked fill={"#FF6063"} stroke={"white"}/>
                        <span className="ml-3 text-red-orange fw-5">La table est ouverte</span>
                    </div>
                    <br/> <HapyButtonWithIcon text="Commander" handleClick={handleCommandClick}
                                              iconComponent={<IconOrder/>}/>
                    <br/> <br/>
                    <HapyButtonWithIcon text="Voir le ticket" handleClick={() => {
                        navigate('/table-note')
                    }} iconComponent={<IconNote/>}/>
                    <br/> <br/>
                    <HapyButtonWithIcon text="Reserver la table" handleClick={() => navigate('/reservation/new')}
                                        iconComponent={<IconReservationAdd/>}/>
                    <br/>
                    {showError && (<div className={"mt-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                </div>
            </>
        )

}
export default Table_TableOpened