import React, { useState, useEffect, useRef  } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'; 

import './Style/Style.css';
import {PAGE_SERVICE} from './Box-page-service';
import { SetpageDetail, SetPatientInfo } from "../../../Redux-store/Local-state";
import { PATIENT_INFO } from "../../API/API";
import Swal from "sweetalert2";

export default function MAIN_SHOW() {

    const Dispatch = useDispatch();
    const [BOX_PAGE, SET_BOX_PAGE] = useState([]);
    const [RESET_CLICK, SET_RESET_CLICK] = useState(0);
    const { pathname, search, state } = useLocation();

    const GET_BOX_SERVICE = () => {
        SET_BOX_PAGE(PAGE_SERVICE);
    }

    const SET_PAGE_DETAIL_LOCAL_SATE = (pageKey, background, pagename, title) => {

        Dispatch(
            SetpageDetail({
                PAGE_KEY : pageKey,
                PAGE_BACKGROUND : background,
                PATH_NAME : pagename,
                PAGE_TITLE : title,
            })
        );

    }


    const GET_PATIENT_INFO = () => {

        // axios.get(`${PATIENT_INFO.PATIENT_INFO}${search}`).then(data => {

        //     let X = data.data.result[0]
        //     let OCM = X.ocmnum;
        //     let HN = X.hn;
        //     let NAME = X.name;
        //     let AGE = X.age;
        //     let SET_HN = HN.replace('-','');

        //     Dispatch(
        //         SetPatientInfo({
        //             OCM : OCM,
        //             HN : SET_HN,
        //             NAME : NAME,
        //             AGE : AGE,
        //         })
        //     );

        // });

        Dispatch(
            SetPatientInfo({
                OCM : '  13472689',
                HN : '  900003',
                NAME : 'นาง รามคำแหง  แข็งแรงดี',
                AGE : '20.0.0',
            })
        );

    }


    const RESET_PROFILE = () => {

        SET_RESET_CLICK(RESET_CLICK + 1);

        if(RESET_CLICK === 2){

            // UPDATE PRFILE
            GET_PATIENT_INFO();

            SET_RESET_CLICK(0);

            Swal.fire({
                text: "Update Profile Success",
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });

        }

    }

    useEffect(() => {

        GET_BOX_SERVICE();
        GET_PATIENT_INFO();
    
    }, []);

    return (
        <div className="Body-page" >

            <div className="Tiele-page" onClick={() => RESET_PROFILE()}>
                <b>
                    บริการอื่นๆ สำหรับผู้ป่วยใน
                </b>
            </div>

            <div className="row row-cols-2 row-cols-md-4 g-3 Box-button-page-home">

                {BOX_PAGE.map((i, key) => (
                    <Link 
                        to={i.To_page+search} 
                        key={key} 
                        state={{'PHOTO': i.Service_photo, "PAGE_NAME": i.Tiele}}
                        onClick={() => SET_PAGE_DETAIL_LOCAL_SATE(i.Page_key, i.Service_photo, i.Path_name , i.Tiele)}
                    >
                        <div className="col Box-service-home" key={key}>
                            <div className="card Box-detail-service-home">
                                <img src={i.Service_photo} className="card-img-top" />
                                <div className="card-body">
                                    <b className="card-title">{i.Tiele}</b>
                                    <p className="card-text">
                                        {i.Detail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>

        </div>
    );

}