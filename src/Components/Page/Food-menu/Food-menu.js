import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as LINK_TYPE, animateScroll as scroll } from "react-scroll";
import $ from 'jquery';
import axios from "axios";
 
import './Style.css';
import IMG_FOOD_NULL from '../../../img/Img-of-null.png';
import { DATA_MOCK, FOOD_MENU, FOOD_PHOTO_PATH, BASKET, HOME_PAGE_LOCAL } from "../../API/API";
import {SetMenu_Islam,
        Set_Type_Islam,
        Reset_Food_Islam,

        SetMenu_Danebury,
        Set_Type_Danebury,
        Reset_Food_Danebury,

        SetMenu_Foodhouse,
        Set_Type_Foodhouse,
        Reset_Food_Foodhouse,

        SetKitchenState
        } from "../../../Redux-store/Local-state";

import {FOOD_TYPE_MOCK} from '../../../Mock/Food-type';
import {FOOD_MENU_MOCK} from '../../../Mock/Food-menu';
import BUTTON_TO_BASKET from "./Button-to-basket";

export default function MAIN_SHOW() {

    const history = useNavigate();
    const Dispatch = useDispatch();
    const { pathname, search, state } = useLocation();
    const [MENU_LIST, SET_MENU_LIST] = useState([]);
    const [TYPE_MENU_LIST, SET_TYPE_MENU_LIST] = useState([]);
    const [UPDATE_FOOD_CLICK, SET_UPDATE_FOOD_CLICK] = useState(0);
    const [SUM_DETAIL_BASKET, SET_SUM_DETAIL_BASKET] = useState({PRICE : '', QTY : ''});

    // LOCAL STATE
    const KITCHEN_NAME = useSelector((state) => state.LocalSate.KITCHEN_NAME);
    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);

    const KITCHEN_ISLAM = useSelector((state) => state.LocalSate.ISLAM);
    const TYPE_ISLAM = useSelector((state) => state.LocalSate.TYPE_ISLAM);

    const KITCHEN_DANEBURY = useSelector((state) => state.LocalSate.DANEBURY);
    const TYPE_DANEBURY = useSelector((state) => state.LocalSate.TYPE_DANEBURY);

    const KITCHEN_FOODHOUSE = useSelector((state) => state.LocalSate.FOODHOUSE);
    const TYPE_FOODHOUSE = useSelector((state) => state.LocalSate.TYPE_FOODHOUSE);


    const IMG_NULL = (ev) =>{
        ev.target.src = IMG_FOOD_NULL;
    }


    const GET_FOOD_MENU = () => {

        if(DATA_MOCK === 'ON'){

            // FOOD TYPE
            SET_TYPE_MENU_LIST(FOOD_TYPE_MOCK);

            // FOOD MENU
            SET_MENU_LIST(FOOD_MENU_MOCK);


        }else{

            // FOOD MENU
            if(TYPE_ISLAM != '' && KITCHEN_ISLAM != '' && KITCHEN_COD === 'K001'){

                // console.log("ISLAM TYPE : ", TYPE_ISLAM);
                // console.log("ISLAM MENU : ", KITCHEN_ISLAM);

                SET_TYPE_MENU_LIST(TYPE_ISLAM);
                SET_MENU_LIST(KITCHEN_ISLAM);
                
            }else if(TYPE_DANEBURY != '' && KITCHEN_DANEBURY != '' && KITCHEN_COD === 'K002'){

                // console.log("DANEBURY TYPE : ", TYPE_DANEBURY);
                // console.log("DANEBURY MENU : ", KITCHEN_DANEBURY);

                SET_TYPE_MENU_LIST(TYPE_DANEBURY);
                SET_MENU_LIST(KITCHEN_DANEBURY);

            }else if(TYPE_FOODHOUSE != '' && KITCHEN_FOODHOUSE != '' && KITCHEN_COD === 'K003'){

                // console.log("FOODHOUSE TYPE : ", TYPE_FOODHOUSE);
                // console.log("FOODHOUSE MENU : ", KITCHEN_FOODHOUSE);

                SET_TYPE_MENU_LIST(TYPE_FOODHOUSE);
                SET_MENU_LIST(KITCHEN_FOODHOUSE);

            }else{

                // FOOD TYPE
                axios.get(`${FOOD_MENU.FOOD_TYPE}?Kitchen=${KITCHEN_COD}`).then(data => {

                    

                    if(KITCHEN_COD === 'K001'){

                        Dispatch(
                            Set_Type_Islam({ TYPE_ISLAM : data.data })
                        );
                        
                    }else if(KITCHEN_COD === 'K002'){

                        Dispatch(
                            Set_Type_Danebury({ TYPE_DANEBURY : data.data })
                        );

                    }else if(KITCHEN_COD === 'K003'){

                        Dispatch(
                            Set_Type_Foodhouse({ TYPE_FOODHOUSE : data.data })
                        );

                    }

                    SET_TYPE_MENU_LIST(data.data);
        
                });

                // FOOD MENU
                axios.get(`${FOOD_MENU.FOOD_MENU}?Kitchen=${KITCHEN_COD}`).then(data => {

                    if(KITCHEN_COD === 'K001'){

                        Dispatch(
                            SetMenu_Islam({ ISLAM : data.data })
                        );

                    }else if(KITCHEN_COD === 'K002'){

                        Dispatch(
                            SetMenu_Danebury({ DANEBURY : data.data })
                        );

                    }else if(KITCHEN_COD === 'K003'){

                        Dispatch(
                            SetMenu_Foodhouse({ FOODHOUSE : data.data })
                        );

                    }
                 
                    SET_MENU_LIST(data.data);

                });
                

            }
  
        }

    }


    const ADD_VAL_TO_INPUT = (detail) => {

        $('.Input-search-menu').val(detail);
        
        var modal = document.getElementById("myModal");
        modal.style.display = "none";

    }

    const ResetFoodSate = () => {


        SET_UPDATE_FOOD_CLICK(UPDATE_FOOD_CLICK + 1);

        if(UPDATE_FOOD_CLICK === 2){

            if(KITCHEN_COD === 'K001'){

                Dispatch(
                    Reset_Food_Islam()
                );
    
                TO_PAGE_RELOAD();
    
            }else if(KITCHEN_COD === 'K002'){
    
                Dispatch(
                    Reset_Food_Danebury()
                );
    
                TO_PAGE_RELOAD();
    
            }else if(KITCHEN_COD === 'K003'){
    
                Dispatch(
                    Reset_Food_Foodhouse()
                );
    
                TO_PAGE_RELOAD();
    
            }
    
            function TO_PAGE_RELOAD(){
    
                setTimeout(() => {
    
                    history(`${HOME_PAGE_LOCAL}/Reload-page${search}`);
                    
                }, 800);
    
            }

        }

    }

    const TO_HOME_FOOD = () => {

        Dispatch(
            SetKitchenState({
                KITCHEN_COD : '',
                KITCHEN_NAME : '',
            })
        );

        history(`${HOME_PAGE_LOCAL}/Service/Food-service${search}`);

    }


    useEffect(() => {

        GET_FOOD_MENU();

        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById('myBtn'); 

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if(event.target == modal) {
                modal.style.display = "none";
            }
        }
    
    }, []);

    return (
        <div className="Body-page-menu-food" >
            <main>
                <div className="Heard-menu-title" id="Heard-menu-title">
                    <strong >
                        <div className="Tiele-page" >
                            <b onClick={() => ResetFoodSate()}>
                                ครัว : {KITCHEN_NAME}
                            </b>

                            {/* <Link to={`${HOME_PAGE_LOCAL}/Service/Food-service${search}`}  > */}
                                <b className='Button-back' onClick={() => TO_HOME_FOOD()} style={{float: 'right'}}>
                                    กลับ
                                </b>
                                
                            {/* </Link> */}
                        </div>

                        <div className="input-group" id="myBtn">
                            
                            <input 
                                type="text" 
                                className="myBtn form-control Input-search-menu " 
                                aria-label="Text input with segmented dropdown button" 
                                placeholder="ค้นหา"
                                readOnly
                            />

                            <button 
                                type="button" 
                                className="myBtn dropdown-toggle dropdown-toggle-split Dropdow-search-menu"
                                
                            >
                                <span className="visually-hidden">Toggle Dropdown</span>
                            </button>
                            {/* <button type="button" className="btn btn-outline-secondary Button-search-menu">ค้นหา</button> */}
                        </div>

                        <div id="myModal" className="modal Box-dropdow-menu-list">
                                <div className="modal-content">

                                    <div className="modal-body">
                                        {TYPE_MENU_LIST.map((i, key) => (
                                            <div key={key} >
                                                <LINK_TYPE 
                                                    activeClass="active" 
                                                    to={`${i.TnameTh}`} 
                                                    offset={-105}
                                                    duration={1000}
                                                    style={{width: '100%'}}
                                                    onClick={() => ADD_VAL_TO_INPUT(i.TnameTh)}
                                                >
                                                    <p>{i.TnameTh}</p>
                                                    <hr/>
                                                </LINK_TYPE>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                    </strong>
                </div>

                <div className="g-3">
                    {TYPE_MENU_LIST.map((i, key) => (
                        <div key={key} className="Body-type-list" id={i.TnameTh}>

                            <b style={{paddingLeft: '10px', fontSize: '20px '}}>{i.TnameTh}</b>
                            <hr/>

                            <div className="row row-cols-2 row-cols-md-5 g-3 " style={{background: '', width: '100%', margin: 'auto'}}>
                                {MENU_LIST.map((i_, key) => {
                                    if(i_.FodTypStt === i.Tkey){
                                        return(
                                            <Link 
                                                to={`${pathname}/${i_.FodBitCod}${search}`} 
                                                key={key}
                                                state={{FoodId : i_.FodBitCod, Page_type : 'Show'}}
                                            >
                                                <div className="col Box-menu-food">
                                                    <div className="card Box-detail-menu-food">
                                                        <img src={`${FOOD_PHOTO_PATH}/${i_.FodPhoNam}`} onError={IMG_NULL} className="card-img-top" />
                                                        <div className="card-body-food">
                                                            <b className="card-title">
                                                                {i_.FoodNameDisplay_TH}
                                                            </b>
                                                            <p className="Text-price-menu">
                                                                <b>{i_.FodPrcNum}.-</b>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    }
                                })}
                            </div>
                          
                        </div>
                    ))}
                </div>

                <BUTTON_TO_BASKET/>

            </main>
        </div>
    );

}