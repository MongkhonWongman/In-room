import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as LINK_TYPE, animateScroll as scroll } from "react-scroll";
import $ from 'jquery';
import axios from "axios";
 
import './Style.css';

import LOADING_ICON from '../../../img/Loading-icon.gif';


export default function MAIN_SHOW() {

    const history = useNavigate();
    const { pathname, search, state } = useLocation();
    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);

    const TO_FOOD_MENU = () => {

        setTimeout(() => {
            history(`/Patientin-room/Service/Food-service/${KITCHEN_COD}${search}`);
        }, 3500);

    }

    useEffect(() => {

        TO_FOOD_MENU();

    }, []);

    return(
        <div className="Box-body-loading">
            <img src={LOADING_ICON} />
        </div>
    );
}