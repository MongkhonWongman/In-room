import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as LINK_TYPE, animateScroll as scroll } from "react-scroll";
import $ from 'jquery';
import axios from "axios";
 
import './Style.css';
import { BASKET } from "../../API/API";

import { SetKitchenState } from "../../../Redux-store/Local-state";


export default function BUTTON_TO_BASKET() {

    const history = useNavigate();
    const Dispatch = useDispatch();
    const { pathname, search, state } = useLocation();
    const [SUM_DETAIL_BASKET, SET_SUM_DETAIL_BASKET] = useState({PRICE : '', QTY : ''});
    const [FOOD_MAIN_PAGE, SET_FOOD_MAIN_PAGE] = useState('');

    // LOCAL STATE
    const KITCHEN_NAME = useSelector((state) => state.LocalSate.KITCHEN_NAME);
    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);


    const GET_ORDER_IN_BASKET = () => {

        axios.get(`${BASKET.COUNT_BASKET}${search}`).then(data => {

            if(data.data[0].Amount_N != undefined){

                document.getElementById('Box-show-basket').style = 'block';

            }

            SET_SUM_DETAIL_BASKET({...SUM_DETAIL_BASKET, PRICE: data.data[0].Amount_N, QTY : data.data[0].SumQTY_N });

        });
        
    }

    const CHECK_KITCHEN_CODE = () => {

        if(KITCHEN_COD === '' || KITCHEN_COD === 'Main'){

            SET_FOOD_MAIN_PAGE('/Main');

            Dispatch(
                SetKitchenState({
                    KITCHEN_COD : 'Main',
                    KITCHEN_NAME : '',
                })
            );
         
        }

    }


    useEffect(() => {

        GET_ORDER_IN_BASKET();
        CHECK_KITCHEN_CODE();

    }, []);

    return (
        <div className="Box-show-basket" id="Box-show-basket" style={{display: 'none'}}>
            <Link to={`${pathname}${FOOD_MAIN_PAGE}/Basket${search}`} className="btn btn-primary" >
                <span className="Basket-detail-left">
                    ตะกร้า • {SUM_DETAIL_BASKET.QTY} รายการ
                </span>

                <span className="Basket-detail-right">
                    ฿{SUM_DETAIL_BASKET.PRICE}
                </span>
            </Link>
        </div>
    );

}