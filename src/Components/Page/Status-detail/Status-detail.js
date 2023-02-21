import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 

import './Style.css';
import axios from "axios";
import { HOME_PAGE_LOCAL, STATUS_DETAIL } from "../../API/API";
import { FORMAT_BILL_ID } from "../../Function-center/Function-center";
import Swal from "sweetalert2";

export default function MAIN_SHOW() {

    let NEW_BILL_ID;

    const navigate = useNavigate();
    const history = useNavigate();
    const { pathname, search, state } = useLocation();
    const [BILL_ID, SET_BILL_ID] = useState([]);
    const [SHOW_DETAIL, SET_SHOW_DETAIL] = useState([]);
    const [SHOW_PAGE_FOOD, SET_SHOW_PAGE_FOOD] = useState(false);

    const PAGE_KEY = useSelector((state) => state.LocalSate.PAGE_KEY);
    const PATH_NAME = useSelector((state) => state.LocalSate.PATH_NAME);
    const PAGE_TITLE = useSelector((state) => state.LocalSate.PAGE_TITLE);
    const OCM = useSelector((state) => state.LocalSate.OCM);

    const GET_STATUS_DETAIL = () => {

        if(PATH_NAME === 'Food-service'){

            SET_SHOW_PAGE_FOOD(true);

            axios.get(`${STATUS_DETAIL.BILL_ID}${search}&Page_key=${PAGE_KEY}&Ocm=${OCM}`).then(data => {

                SET_BILL_ID(data.data);
    
            });

        }

        // STATUS DETAIL
        axios.get(`${STATUS_DETAIL.STATUS_DETAIL}${search}&Page_key=${PAGE_KEY}`).then(data => {

            SET_SHOW_DETAIL(data.data);

        });

    }

    const BACK_HISTORY = () => {
        if(PATH_NAME === 'Food-service'){

            history( `${HOME_PAGE_LOCAL}/Service/Food-service${search}`);

        }else{

            navigate(-1);

        }
 
    }


    const CANCEL_SERVICE = (seq) => {

        axios.get(`${STATUS_DETAIL.CANCEL_SERVICE}?Seq=${seq}`).then(data => {

            Swal.fire({
                text: "ยกเลิกสำเร็จ",
                icon: 'success',
                timer: 1300,
                showConfirmButton: false
            });

            GET_STATUS_DETAIL();

        });

    }

    useEffect(() => {

        GET_STATUS_DETAIL();

    }, []);

    return (
        <div className='Body-status-detail'>
            <div className="Head-status-detail" onClick={() => BACK_HISTORY()}>
                <span >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </span>
                &nbsp;&nbsp;
                <b>สถานะ : {PAGE_TITLE}</b>
            </div>

            <div className="Box-status-detail">
            {SHOW_PAGE_FOOD ? (

                <>
                    {BILL_ID.map((i, key) => (
                        <div key={key} className="Card-detail">
                            <div>
                                <span className="Box-detail-id">

                                    {(()=>{

                                        NEW_BILL_ID = FORMAT_BILL_ID(i.PirBillCod1, i.PirBillCod2);
                                        return(
                                            <>
                                                ID : {NEW_BILL_ID.ID1_SHOW}-{NEW_BILL_ID.ID2_SHOW}
                                            </>
                                        )
                                    })()}

                                </span>
                                <span className="Status-display">
                                    <b>{i.PirOdrStt}</b>
                                </span>
                            </div>
                    
                            <hr/>
                            {SHOW_DETAIL.map((i2, key) => {
                                if(i2.PirBillCod2 === i.PirBillCod2){
                                    return(
                                        <div key={key}>
                                            <span className="Display-food-qty">
                                                <b>{i2.PirOdrQty}x</b>
                                            </span>
                                            &nbsp;
                                            <span className="Display-food-name">
                                                {i2.FodMnuNamThai}
                                            </span>
                                            <span className="Display-food-price">
                                                ฿{i2.FodPrcNum}
                                            </span>
                                            <br/>
                                            &nbsp;&nbsp;&nbsp;
                                            <span className="Display-food-comment">
                                                {i2.PirOdrCmt}
                                            </span>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    ))}
                </>

            ) : 
            
                <>
                {SHOW_DETAIL.map((i, key) => {
                    return(
                        <div key={key} className="Card-detail">
                            <span className="Display-title-service">
                                <div className="Display-date-time-service">
                                    วัน : {i.PirOdrDte} เวลา : {i.PirOdrTme}
                                </div>
                                <b>{i.PirSelStt}</b>
                            </span>
                            <span className="Display-service-status">
                                {i.PirOdrStt}
                            </span>
                            <br/>
                            
                            <div className="Display-food-comment">
                                {i.PirOdrCmt}

                                <br/>
                                <div className="Box-cancel-service" style={{ textAlign: 'right'}}>
                                    <button type="button" className="btn btn-warning" onClick={() => CANCEL_SERVICE(i.PirSeq)}>ยกเลิกคำขอ</button>
                                </div>
                            </div>
                           
                    </div>
                    );
                })}
                </>

            }
  
            </div>

        </div>
    );
}