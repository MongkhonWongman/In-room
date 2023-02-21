import axios from "axios";
import React, { useState, useEffect, useRef  } from "react";
import $ from 'jquery';
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 

import '../Style.css';
import IMG_FOOD_NULL from '../../../../../img/Img-of-null.png';
import { DATA_MOCK, FOOD_MENU, FOOD_PHOTO_PATH, ADD_ORDER_FOOD, BASKET, HOME_PAGE_LOCAL } from "../../../../API/API";
import { FOOD_MENU_MOCK } from "../../../../../Mock/Food-menu";
import Swal from "sweetalert2";

export default function SHOW_MAIN() {

    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);
    const OCM = useSelector((state) => state.LocalSate.OCM);
    const HN = useSelector((state) => state.LocalSate.HN);
    const NAME = useSelector((state) => state.LocalSate.NAME);
    const AGE = useSelector((state) => state.LocalSate.AGE);

    const { pathname, search, state } = useLocation();
    const [ FOOD_DETAIL, SET_FOOD_DETAIL ] = useState([]);
    const [USER_TYPE, SET_USER_TYPE] = useState(null);
    const [ FOOD_QTY, SET_FOOD_QTY ] = useState(1);
    const [ FOOD_QTY_FOR_EDIT, SET_FOOD_QTY_FOR_EDIT ] = useState(1);
    const [PAGE_EDIT, SET_PAGE_EDIT] = useState(false);
    const [BUTTON_DELETE, SET_BUTTON_DELETE] = useState(false);
    const history = useNavigate();

    const IMG_NULL = (ev) =>{
        ev.target.src = IMG_FOOD_NULL;
    }

    const GET_FOOD_DETAIL = () => {

        if(DATA_MOCK === 'ON'){

            let FOOD_DETAIL_ = FOOD_MENU_MOCK.find(el => el.FodKitCod === KITCHEN_COD);
            SET_FOOD_DETAIL([FOOD_DETAIL_]);

        }else{

            if(state.Page_type === 'Show'){

                axios.get(`${FOOD_MENU.FOOD_DETAIL}?FoodId=${state.FoodId}&PageType=Show`).then(data => {

                    SET_FOOD_DETAIL(data.data);
        
                });

            }else{

                // FOR PAGE EDIT
                axios.get(`${FOOD_MENU.FOOD_DETAIL}?FoodId=${state.FoodId}&SeqEdit=${state.Seq}&PageType=Edit`).then(data => {

                    setTimeout(() => {

                        if(data.data[0].PirPrcTyp === 'R'){
                            $('.R').prop('checked', true);
                        }else{
                            $('.P').prop('checked', true);
                        }

                        SET_FOOD_QTY_FOR_EDIT( parseInt(data.data[0].PirOdrQty, 10) );

                    }, 500);

                    SET_FOOD_DETAIL(data.data);
                    SET_PAGE_EDIT(true);
        
                });

            }

        }

    }


    const EDIT_QTY = (key) => {

        if(key === 'UP'){

            SET_FOOD_QTY(FOOD_QTY + 1);

            // FOR PAGE EDIT
            SET_FOOD_QTY_FOR_EDIT(FOOD_QTY_FOR_EDIT + 1);

            if(FOOD_QTY_FOR_EDIT < 1){

                console.log('NO DELETE');

                SET_BUTTON_DELETE(false);

            }

        }else{
            SET_FOOD_QTY(FOOD_QTY - 1);

              // FOR PAGE EDIT
              SET_FOOD_QTY_FOR_EDIT(FOOD_QTY_FOR_EDIT - 1);

            if(FOOD_QTY_FOR_EDIT === 1){

                console.log('DELETE');
                SET_BUTTON_DELETE(true);

            }
          
        }
    
    }


    const F_SET_USER_TYPE = (key) => {

        if(key === 'patient'){

            // Patient
            SET_USER_TYPE('P');

        }else{

            // Relative
            SET_USER_TYPE('R');

        }

    }


    const ADD_FOOD_TO_BASKET = () => {

        if(USER_TYPE){

            let FORM_DATA = new FormData($('#FROM-FOOD-DETAIL')[0]);
            axios({
                method: "post",
                url: `${ADD_ORDER_FOOD.BASKET+search}
                    &OcmCod=${OCM}
                    &User=G
                    &Hn=${HN}
                    &OrderRoom=D
                    &Name=${NAME}
                    &Age=${AGE}
                    &UserType=${USER_TYPE}`,
                data: FORM_DATA,
                headers: { "Content-Type": "multipart/form-data" }
            }).then(data => {

                Swal.fire({
                    text: "เพิ่มไปยังตะกร้าสำเร็จ",
                    icon: 'success',
                    timer: 1300,
                    showConfirmButton: false
                });

                setTimeout(() => {
                    history(`${HOME_PAGE_LOCAL}/Service/Food-service/${KITCHEN_COD}${search}`);
                }, 1400);
    
            });

        }else{

            Swal.fire({
                text: "กรุณาเลือกวิธีชำระเงิน",
                icon: 'warning'
            });

        }

    }

    // FOR PAGE EDIT
    const SAVE_EDIT = (Seq, userType) => {

        let SET_TYPE = '';
        
        if(USER_TYPE != null){

            SET_TYPE = USER_TYPE;

        }else{

            SET_TYPE = userType;
        }

        let FORM_DATA = new FormData($('#FROM-FOOD-DETAIL')[0]);
        axios({
            method: "post",
            url: `${BASKET.EDIT_ORDER+search}
                &Seq=${Seq}
                &UserType=${SET_TYPE}`,
            data: FORM_DATA,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(data => {

            Swal.fire({
                text: "แก้ไขสำเร็จ",
                icon: 'success',
                timer: 1300,
                showConfirmButton: false
            });

            setTimeout(() => {
                history(`${HOME_PAGE_LOCAL}/Service/Food-service/${KITCHEN_COD}/Basket${search}`);
            }, 1450);

        });


    }


    const DELETE_ORDER = (seq) => {

        axios.get(`${BASKET.DELETE_ORDER}?Seq=${seq}`).then(data => {

            Swal.fire({
                text: "ลบสำเร็จ",
                icon: 'success',
                timer: 1300,
                showConfirmButton: false
            });

            setTimeout(() => {

                if(KITCHEN_COD === 'Main'){
                    history(`${HOME_PAGE_LOCAL}/Service/Food-service/${KITCHEN_COD}/Basket${search}`);
                }else{
                    history(`${HOME_PAGE_LOCAL}/Service/Food-service/${KITCHEN_COD}${search}`);
                }

            }, 1450);
        



        })
    }

    useEffect(() => {

        GET_FOOD_DETAIL();
    
    }, []);

    return (
        <div className="Body-food-detail" >
            {FOOD_DETAIL.map((i, key) => {
                return(
                    <form key={key} id='FROM-FOOD-DETAIL' className="Card-food-detail">
                   
                        <input type='text' value={i.FodBitCod} name='Food-id' style={{display: 'none'}} readOnly />
                        <input type='text' value={i.FodPrcNum} name='Menu-price' style={{display: 'none'}} readOnly />
                        <input type="text" value={FOOD_QTY} name="QTY" style={{display: 'none'}} readOnly/>
                        <input type="text" value={FOOD_QTY_FOR_EDIT} name="QTY-FOR-EDIT" style={{display: 'none'}} readOnly/>

                        <div className="Button-close">

                        {PAGE_EDIT ? (
                            <Link 
                                to={`${HOME_PAGE_LOCAL}/Service/Food-service/${KITCHEN_COD}/Basket${search}`}
                            >
                                <i className="fa fa-close" ></i>
                            </Link>
                        ) : 
                            <Link 
                                to={`${HOME_PAGE_LOCAL}/Service/Food-service/${KITCHEN_COD}${search}`}
                            >
                                <i className="fa fa-close" ></i>
                            </Link>

                        }

              
                        </div>

                        <div className="Box-left-food-detail"> 
                            <div className="Box-img-food">
                                <img src={FOOD_PHOTO_PATH} onError={IMG_NULL} />
                            </div> 
                        </div>

                        {PAGE_EDIT ? (
                            <>
                                <div className="Box-right-food-detail">

                                    <div className="Box-food-name">
                                        {i.FoodNameDisplay_TH}
                                        <hr/>

                                        <b>ราคา</b> {i.FodPrcNum}.-
                                    </div>

                                    <div className="Box-food-note">
                                        <b>วิธีชำระเงิน</b>
                                        <hr/>

                                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" className="btn-check R" name="btnradio" id="btnradio1" />
                                            <label className="btn btn-outline-primary" htmlFor="btnradio1" onClick={() => F_SET_USER_TYPE('relative')}>อาหารญาติ</label>

                                            <input type="radio" className="btn-check P" name="btnradio" id="btnradio2"  />
                                            <label className="btn btn-outline-primary" htmlFor="btnradio2" onClick={() => F_SET_USER_TYPE('patient')}>อาหารคนไข้</label>
                                        </div>
                                    </div>

                                    <div className="Box-food-note">
                                        <b>หมายเหตุถึงครัว</b>
                                        &nbsp;&nbsp;
                                        <span>ไม่จำเป็นต้องระบุ</span>
                                        <hr/>
                                        <input type="text" defaultValue={i.PirOdrCmt} className="form-control Food-note" placeholder="ระบุรายละเอียด" name="More"/>
                                        <hr/>
                                        <div style={{textAlign: 'center'}}>
                                            <button type="button" className="btn btn-outline-primary" onClick={() => EDIT_QTY('DOW')}>
                                                <b>-</b>
                                            </button>
                                                &nbsp;&nbsp;&nbsp;
                                                    <b className="Display-qty">{FOOD_QTY_FOR_EDIT}</b>
                                                &nbsp;&nbsp;&nbsp;
                                            <button type="button" className="btn btn-outline-primary" onClick={() => EDIT_QTY('UP')}>
                                                <b>+</b>
                                            </button>
                                        </div>
                                    </div>

                                    {BUTTON_DELETE ? (

                                        <div className="Box-add-food">
                                            <button type="button" className="btn btn-danger" onClick={() => DELETE_ORDER(i.PirSeq)}>ลบ</button>
                                        </div>

                                    ):
                                        <div className="Box-add-food">
                                            <button type="button" className="btn btn-primary " onClick={() => SAVE_EDIT(i.PirSeq, i.PirPrcTyp)}>บันทึกการแก้ไข</button>
                                        </div>
                                    }

                                </div>
                            </>


                        ): 
                            <>
                            
                            <div className="Box-right-food-detail">

                                <div className="Box-food-name">
                                    {i.FoodNameDisplay_TH}
                                    <hr/>

                                    <b>ราคา</b> {i.FodPrcNum}.-
                                </div>

                                <div className="Box-food-note">
                                    <b>วิธีชำระเงิน</b>
                                    <hr/>

                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
                                        <label className="btn btn-outline-primary" htmlFor="btnradio1" onClick={() => F_SET_USER_TYPE('relative')}>อาหารญาติ</label>

                                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                        <label className="btn btn-outline-primary" htmlFor="btnradio2" onClick={() => F_SET_USER_TYPE('patient')}>อาหารคนไข้</label>
                                    </div>
                                </div>

                                <div className="Box-food-note">
                                    <b>หมายเหตุถึงครัว</b>
                                    &nbsp;&nbsp;
                                    <span>ไม่จำเป็นต้องระบุ</span>
                                    <hr/>
                                    <input type="text" className="form-control Food-note" placeholder="ระบุรายละเอียด" name="More"/>
                                    <hr/>
                                    <div style={{textAlign: 'center'}}>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => EDIT_QTY('DOW')}>
                                            <b>-</b>
                                        </button>
                                            &nbsp;&nbsp;&nbsp;
                                                <b className="Display-qty">{FOOD_QTY}</b>
                                            &nbsp;&nbsp;&nbsp;
                                        <button type="button" className="btn btn-outline-primary" onClick={() => EDIT_QTY('UP')}>
                                            <b>+</b>
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className="Box-add-food">
                                <button type="button" className="btn btn-primary " onClick={() => ADD_FOOD_TO_BASKET(i.FodBitCod)}>เพิ่มไปยังตะกร้า</button>
                            </div>

                            </>

                        }

                    </form>
                );
            })}
        </div>
    );
}