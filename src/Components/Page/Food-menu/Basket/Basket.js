import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as LINK_TYPE, animateScroll as scroll } from "react-scroll";
import Swal from "sweetalert2";
import $ from 'jquery';
import axios from "axios";
 
import './Style.css';
import { BASKET, HOME_PAGE_LOCAL } from "../../../API/API";
import { SetKitchenState } from "../../../../Redux-store/Local-state";


export default function MAIN_SHOW() {

    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname, search, state } = useLocation();
    const [SUM_DETAIL_BASKET, SET_SUM_DETAIL_BASKET] = useState([]);
    const [ORDER_LIST, SET_ORDER_LIST] = useState([]);
    const [SHOW_BUTTON_CON, SET_SHOW_BUTTON_CON] = useState(false);

    const history = useNavigate();
    const OCM = useSelector((state) => state.LocalSate.OCM);
    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);

    const GET_ORDER_IN_BASKET = () => {

        axios.get(`${BASKET.ORDER_IN_BASKET}${search}`).then(data => {

            if(data.data){

                SET_ORDER_LIST(data.data);
                SET_SHOW_BUTTON_CON(true);

            }else{

                if(KITCHEN_COD === 'Main'){
                    history( `${HOME_PAGE_LOCAL}/Service/Food-service${search}`);
                }

                SET_ORDER_LIST([]);

            }

        });

    }


    const COUNT_ORDER_BASKET = () => {

        axios.get(`${BASKET.COUNT_BASKET}${search}`).then(data => {
            
            SET_SUM_DETAIL_BASKET(data.data);

        });

    }


    const BACK_HISTORY = () => {

        if(KITCHEN_COD === 'Main'){
            history( `${HOME_PAGE_LOCAL}/Service/Food-service${search}`);
         
        }else{
          
            history( `${HOME_PAGE_LOCAL}/Service/Food-service/${KITCHEN_COD}${search}`);
        }


    }


    const CONFIRM = () => {

        axios.get(`${BASKET.CONFIRM_ORDER}${search}&Ocm=${OCM}`).then(data => {

            Swal.fire({
                text: "สั่งซื้อสำเร็จ",
                icon: 'success',
                timer: 1300,
                showConfirmButton: false
            });

            setTimeout(() => {
                history( `${HOME_PAGE_LOCAL}/Service/Status-detail${search}`);
            }, 1400);

        });

    }


    useEffect(() => {
    
        GET_ORDER_IN_BASKET();
        COUNT_ORDER_BASKET();

    }, []);


    return (
        <div className="Body-page-basket" >

            <div className="Box-head-basket-">
                <span onClick={() => BACK_HISTORY()}>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </span>
                &nbsp;&nbsp;
                <b>สรุปคำสั่งซื้อ</b>
            </div>

            {SHOW_BUTTON_CON ? (
                <>
                <div className="Box-detail-basket">
                    {ORDER_LIST.map((i, key) => (
                        <span key={key}>
                            <span className="Display-food-qty">
                                <b>{i.PirOdrQty}x</b>
                            </span>
                            &nbsp;
                            <span className="Display-food-name">
                                {i.FoodNameDisplay_TH}
                            </span>
                            <span className="Display-food-price">
                                ฿{i.FodPrcNum}
                            </span>
                            <br/>

                            &nbsp;&nbsp;&nbsp;
                            <span className="Display-food-comment">
                                {i.PirOdrCmt}
                            </span>

                            &nbsp;&nbsp;&nbsp;
                            {/* <button type="button" class="btn btn-warning">Warning</button> */}
                            <div className="Box-button-edit-food">
                                <Link 
                                    to={`${HOME_PAGE_LOCAL}/Service/Food-service/${i.FodKitCod}/${i.FodBitCod}${search}`} 
                                    state={{Seq: i.PirSeq ,FoodId : i.FodBitCod, Page_type : 'Edit'}}
                                    className="btn btn-warning"
                                >
                                    แก้ไข
                                </Link>
                            </div>
       
                            <hr/>
                        </span>
                    ))}
                </div>

                <div className="Box-button-confirm">
                    {SUM_DETAIL_BASKET.map((i, key) => (
                        <div key={key}>
                            <span className="Detail-confirm-left">
                                รวมทั้งหมด
                            </span>
                            <span className="Detail-confirm-right">
                                <b>฿{i.Amount_N}</b>
                            </span>
                        </div>
                    ))}

                    <button className="btn btn-primary" onClick={() => CONFIRM()}>
                        สั่งซื้อ
                    </button>
                </div>  
                </>
            ) : 
                <>
                <div className="Box-detail-basket" style={{textAlign: 'center', color: 'rgb(194, 194, 194)'}}>
                    <br/><br/><br/>
                    <h1>
                        No information
                    </h1>
                </div>

                <div className="Box-button-confirm">
                    <button className="btn btn-primary">
                        ไม่มี order ในตะกร้า
                    </button>
                </div>  
                </>
            }         
        </div>
    );

}