import React, { useState, useEffect, useRef  } from "react";
import { Link } from "react-router-dom";
import {MENU_DATA} from './Menu-data';

import './Style.css';

export default function MAIN_SHOW() {

    const [BOX_PMENU, SET_BOX_MENU] = useState([])

    const GET_BOX_MENU = () => {
        SET_BOX_MENU(MENU_DATA);
    }

    useEffect(() => {

        GET_BOX_MENU();
    
      }, []);

    return (
        <>
            <div className='Body-menu-bar'>
                
                {BOX_PMENU.map((i, key) => (

                   
                        <div className="Menu-columns">
                           
                           <div className="Button-menu">
                            <img src={i.Icon} className="Icon-menu"/>
                        
                                <p className="">
                                    tttt
                                </p>
                     
                            </div>
                        </div>
                 

                    // <div className='Menu-columns' key={key}>
                    //     <Link to={i.Topage} className='Button-link-menu'>
                    //         <div className="Button-menu">
                    //             <img src={i.Icon} className="Icon-menu"/>
                    //             {/* <div>
                    //                 dd
                    //             </div> */}
                    //             ทด
                    //         </div>
                        
                    //     </Link>
                    // </div>
                ))}



            </div>
        </>
    );
}