import React, { useState, useEffect } from "react";

import './Style.css';
import { HOSPITAL_DETAIL } from "../API/API";


export default function MAIN_SHOW() {

    const [HOSPITAL_LOGO, SET_HOSPITAL_LOGO] = useState([]);
    const [CLICK_GET_SCREEN, SET_CLICK_GET_SCREEN] = useState(0);

    const GET_LOGO_HOSPITAL = () => {

        if(HOSPITAL_DETAIL.HOSPITAL_NAME === 'RAM'){
            SET_HOSPITAL_LOGO(HOSPITAL_DETAIL.HOSPITAL_LOGO);
        }

        if(HOSPITAL_DETAIL.HOSPITAL_NAME === 'CMR'){
            SET_HOSPITAL_LOGO(HOSPITAL_DETAIL.HOSPITAL_LOGO);
        }

    }

    const GET_SCREEN = () => {

        SET_CLICK_GET_SCREEN(CLICK_GET_SCREEN + 1);

        if(CLICK_GET_SCREEN === 4){
            alert(`your screen size ${window.screen.availWidth}px`);
            SET_CLICK_GET_SCREEN(0);
        }

    }


    useEffect(() => {

        GET_LOGO_HOSPITAL();

        if(CLICK_GET_SCREEN === 5){
            alert(`your screen size ${window.screen.availWidth}px`);
            SET_CLICK_GET_SCREEN(0);
        }
    
      }, []);

    return (
        <div className='Body-heard-bar'>
            <img src={HOSPITAL_LOGO} className='ICON-HOSPITAL' onClick={() => GET_SCREEN()}/>
        </div>
    );
}