import React, { useState, useEffect, useRef  } from "react";
import $ from 'jquery';
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'; 

import './Style.css';
import ICON_ALERT_OOF from '../../../img/Alert-service-off.png';
import ICON_ALERT_ON from '../../../img/Alert-service-on.png';
import {NURSE_SERVICE, ASSISTANT_SERVICE, FOOD_SERVICE_RAM, FOOD_SERVICE_CMR} from './Service-data';
import { HOME_PAGE_LOCAL, HOSPITAL_DETAIL, SERVICE_PAGE, STATUS_DETAIL } from "../../API/API";
import { SetKitchenState } from '../../../Redux-store/Local-state';
import Swal from "sweetalert2";
import BUTTON_TO_BASKET from "../Food-menu/Button-to-basket";


export default function SHOW_MAIN() {

    const { pathname, search, state } = useLocation();
    const Dispatch = useDispatch();
    const { PageName } = useParams();
    const history = useNavigate();

    const [SELECT_SERVICE, SET_SELECT_SERVICE] = useState([]);
    const [TITLE_DETAIL_FOOD, SET_TITLE_DETAIL_FOOD] = useState([]);
    let TYPE_SERVICE= '';
    

    const [TITLE_FOOD, SET_TITLE_FOOD] = useState(false);
    const [SHOW_PAGE_VISIT, SET_SHOW_PAGE_VISIT] = useState(false);
    const [SHOW_PAGE_SERVICE, SET_SHOW_PAGE_SERVICE] = useState(false);
    const [SHOW_SERVICE_ITEM, SET_SHOW_SERVICE_ITEM] = useState(false);
    const [CHECK_FOOD_PAGE, SET_CHECK_FOOD_PAGE] = useState(false);
    const [STATUS_ICON, SET_STATUS_ICON] = useState(false);

    // LOCAL SATE
    const PAGE_KEY = useSelector((state) => state.LocalSate.PAGE_KEY);
    const PAGE_TITLE = useSelector((state) => state.LocalSate.PAGE_TITLE);
    const PAGE_BACKGROUND = useSelector((state) => state.LocalSate.PAGE_BACKGROUND);
    const OCM = useSelector((state) => state.LocalSate.OCM);
    const HN = useSelector((state) => state.LocalSate.HN);
    const NAME = useSelector((state) => state.LocalSate.NAME);
    const AGE = useSelector((state) => state.LocalSate.AGE);
 

    const GET_VISIT_SUMMARY = () => {

    }


    const GET_PAGE = () => {

        if(PageName === 'Nurse-service'){

            SET_SELECT_SERVICE(NURSE_SERVICE);
        }

        if(PageName === 'Assistant-service'){

            SET_SELECT_SERVICE(ASSISTANT_SERVICE);
        }

        if(PageName === 'Food-service'){

            SET_CHECK_FOOD_PAGE(true);

            // FOR RAM
            if(HOSPITAL_DETAIL.HOSPITAL_NAME === 'RAM'){

                SET_TITLE_DETAIL_FOOD('เลือกครัวที่ต้องการสั่งอาหาร');

                SET_SELECT_SERVICE(FOOD_SERVICE_RAM);

                $('.Button-add-service').css({'display':'none'});

                SET_TITLE_FOOD(true);

            }

            // FOR CMR
            if(HOSPITAL_DETAIL.HOSPITAL_NAME === 'CMR'){

                SET_TITLE_DETAIL_FOOD('เลือกประเภทเมนูที่ต้องการสั่งอาหาร');

                SET_SELECT_SERVICE(FOOD_SERVICE_CMR);

                $('.Button-add-service').css({'display':'none'});
                
                SET_TITLE_FOOD(true);
                SET_SHOW_SERVICE_ITEM(true);
                
            }
        }

        if(PageName === 'After-visit-summary'){
            SET_SHOW_PAGE_VISIT(true)
        }else{
            SET_SHOW_PAGE_SERVICE(true);
        }
        
    }
    let ROW_FOR_FOOD = CHECK_FOOD_PAGE ? 'Row-for-mobile' : 'row'; // ถ้าเป็นหน้าอาหารให้เรียงปุ่ม บนลงล่าง (classname Row-for-mobile จะทำงานต่อเมื่อเป็นขนาดมือถือ Screen-600.css)
    let ROW_SERVICE_ITEM = SHOW_SERVICE_ITEM ? `${ROW_FOR_FOOD} row-cols-2 row-cols-md-2 g-2` : `${ROW_FOR_FOOD} row-cols-3 row-cols-md-3 g-3`;  // 2 ปุ่ม/แถว CMR, 3 ปุ่ม/แถว RAM
    let PATTERN_FOR_FOOD = CHECK_FOOD_PAGE ? 'Box-select-detail' : ''; // ถ้าเป็นหน้าอาหารให้จัดปุ่มเป็น center

    let TITLE_FOOD_STYLE = TITLE_FOOD ? 'on' : 'off';
    let STYLE_VISIT = SHOW_PAGE_VISIT ? 'on' : 'off';
    let STYLE_SERVICE = SHOW_PAGE_SERVICE ? 'on' : 'off';


    const BUTTON_SERVICE = (i, cod, name) => {

        let data = SELECT_SERVICE.find(el => el.Key === i);

        if(PageName === 'Food-service'){

            Dispatch(
                SetKitchenState({
                    KITCHEN_COD : cod,
                    KITCHEN_NAME : name,
                })
            );

            history( `${HOME_PAGE_LOCAL}/Service/Food-service/${cod}${search}`);

        }else{

            setTimeout(() => {

                if ($(`input.Checkbox-${i}`).is(':checked')){
    
                    $(`.Button-select-${i}`).attr("src", data.ON);

                    if(i == '4'){
                        document.getElementById("myModal").style.display = 'block';
                    }
        
                }else{
                    // cancel
                    $(`.Button-select-${i}`).attr("src", data.OFF);
                }
                
            }, 50);

        }
    }

    const CLOSE = () => {
        document.getElementById("myModal").style.display = "none";
    }


    const ADD_SERVICE = () => {

        axios({
            method: "post",
            url: `${SERVICE_PAGE.ADD_SERVICE}${search}&Ocm=${OCM}&Hn=${HN}&Name=${NAME}&Age=${AGE}&Page_key=${PAGE_KEY}`,
            data: new FormData($('#From-select-service')[0]),
            headers: { "Content-Type": "multipart/form-data" },
        }).then( data => {

            Swal.fire({
                text: "ส่งคำขอสำเร็จ",
                icon: 'success',
                timer: 1300,
                showConfirmButton: false
            });

            setTimeout(() => {

                CHECK_STATUS();
                
            }, 1500);

        });
        
    }


    const CHECK_STATUS = () => {

        axios.get(`${STATUS_DETAIL.STATUS_DETAIL}${search}&Ocm=${OCM}&Page_key=${PAGE_KEY}`).then(data => {

            if(data.data != ''){

                SET_STATUS_ICON(true);

            }

        });
   
    }
    let DISPLAY_ICON_STATUS = STATUS_ICON ? ICON_ALERT_ON : ICON_ALERT_OOF;


    useEffect(() => {

        GET_PAGE();
        CHECK_STATUS();
    
    }, []);

    return (
        <>
            <div className="Body-page">

                <div className="Tiele-page">
                    <b>
                        {PAGE_TITLE}
                    </b>

                    <Link to={`${HOME_PAGE_LOCAL}/Home${search}`} className='Button-back' style={{float: 'right'}} >
                        กลับ
                    </Link>
                </div>

                <form id='From-select-service'>
                    <div id="myModal" className="modal" style={{position: 'absolute', zIndex: '90'}}>

                        {/* <!-- Modal content --> */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <span>เพิ่มรายละเอียด</span>
                                <span className="close" onClick={() => CLOSE()}>&times;</span>
                            </div>

                            <div className="modal-body">
                                <div className='Box-show-input' >
                                    <textarea className="form-control" name="More"></textarea>
                                    <br/>
                                    <button type="button" className="btn btn-primary" onClick={() => CLOSE()}>
                                        เพิ่ม
                                    </button>
                                </div>
                            </div>

                            <div className="modal-footer">
                                {/* <h3>Modal Footer</h3> */}
                            </div>
                        </div>

                    </div>

                    <div className="col Box-service" >
                        <div className={`card Box-detail-service Display-service-${STYLE_SERVICE}`}>

                            <div className="Box-alert-service">
                                <Link to={`${HOME_PAGE_LOCAL}/Service/Status-detail${search}`}>
                                    <img src={DISPLAY_ICON_STATUS} className="Icon-alert-service"/>
                                </Link>
                            </div>

                            <img src={PAGE_BACKGROUND} className="Background-page"/>

                            <div className="card-body">
                                <div className={`Title-detail-food-${TITLE_FOOD_STYLE}`} style={{textAlign: 'center'}}>
                                    <b>{TITLE_DETAIL_FOOD}</b>
                                </div>
                        
                                <div className={`${ROW_SERVICE_ITEM}`}>
                                    {SELECT_SERVICE.map((i, key) => (
                                        <div key={key} className={`col ${PATTERN_FOR_FOOD}`}>
                                        
                                            <input 
                                                style={{display: 'none'}}
                                                type="checkbox" 
                                                id={`Checkbox-${i.Key}`}
                                                className={`Checkbox-${i.Key}`}  
                                                autoComplete="off"
                                                value={i.Title}
                                                name='Value-service[]'
                                            />

                                            <label onClick={() => BUTTON_SERVICE(i.Key, i.Kitchen_cod, i.Title)} className='card Box-button-service' htmlFor={`Checkbox-${i.Key}`}>
                                                <div className="Box-icon-select-service" >
                                                    <img src={i.OFF} className={`card-img-top Button-select-${i.Key}`} />
                                                </div>
                                                
                                                <div className="Card-body">
                                                    <b className="card-title">{i.Title}</b>
                                                </div>
                                            </label >

                                        </div>
                                    ))}
                                </div>

                                <div className="Box-Button-add-service">
                                    <button type="button" className="btn Button-add-service" onClick={() => ADD_SERVICE()}>ยืนยัน</button>
                                </div>
                                
                            </div>
                        </div>


                        {/* Visit summary */}
                        <div className={`card Body-detail-visit Display-visit-${STYLE_VISIT}`}>
                            <div className="Box-heard-visit ">
                                <div className="column Button-show-visit-left">
                                    เมื่อวาน
                                </div >
                                <div className="column Txt-show-visit-title">
                                    <b>สรุปความเห็นแพทย์ประจำวัน</b>              
                                </div>
                                <div className="column Button-show-visit-right">
                                    วันนี้              
                                </div>
                            </div>

                            <div>
                                <div className="Box-date-visit">
                                    <b>12-05-2566</b>
                                </div>

                                <div className="Box-detail-visit">

                                    <div>
                                        <div className="Title-detail-visit">
                                            <b>สรุปอาการ</b>
                                        </div>
                                        -<br/>
                                        -<br/>
                                        -<br/>
                                    </div>
                                    <br/>

                                    <div>
                                        <div className="Title-detail-visit">
                                            <b>แผนการรักษา</b>
                                        </div>
                                        -<br/>
                                        -<br/>
                                        -<br/>
                                    </div>
                                    <br/>

                                    <div>
                                        <div className="Title-detail-visit">
                                            <b>คำแนะนำการปฏิบัติตัว</b>
                                        </div>
                                        -<br/>
                                        -<br/>
                                        -<br/>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                    

                    {CHECK_FOOD_PAGE ? (
                        <div className="Box-basket-page-service">
                            <div style={{width: '100%', overflow: 'auto', borderRadius: '10px'}}>
                                <BUTTON_TO_BASKET />
                            </div>
                        </div>
                    ) : null}
       

                </form>
            </div>
        </>
    );
}