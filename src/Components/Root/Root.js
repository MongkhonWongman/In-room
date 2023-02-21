import React, { useState, useEffect, useRef  } from "react";
import { Outlet, useLocation } from "react-router-dom";

import './Style.css';
import HEARD_BAR from '../Head-bar/Head-bar';
import MENU_BAR from '../Menu-bar/Menu-bar';

export default function ROOT() {

  return (
    <div className="BOX-BODY-ROOT">

      <div className='BOX-HEARD'>
          <HEARD_BAR />
        </div>

        <div className='BOX-DETAIL'>
          <Outlet />
        </div>

        {/* <div className='BOX-MENU-BAR'>
          <MENU_BAR />
        </div> */}
        
    </div>
  );
}