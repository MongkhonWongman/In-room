import {createBrowserRouter} from "react-router-dom";
import 'sweetalert2';

import ROOT from "../Components/Root/Root";
import HOEM from "../Components/Page/Home/Home";
import SERVICE_DETAIL from "../Components/Page/Page-service/Service-detail";
import ERROR_PAGE from "../Components/Error-page/Error-page";

import FOOD_MENU from '../Components/Page/Food-menu/Food-menu';
import FOOD_DETAIL from '../Components/Page/Food-menu/Food-detail/RAM/Food-detail';

import BASKET from '../Components/Page/Food-menu/Basket/Basket';
import STATUS_DETAIL from '../Components/Page/Status-detail/Status-detail';

import RELOAD from '../Components/Page/Reload-page/Reload-page';
import { HOME_PAGE_LOCAL } from "../Components/API/API";

export const router = createBrowserRouter([
  {
    path: `${HOME_PAGE_LOCAL}`,
    element: <ROOT />,
    errorElement: <ERROR_PAGE />,
    children: [
      {
        path: `${HOME_PAGE_LOCAL}`,
        element: <HOEM />
      },
      {
        path: `${HOME_PAGE_LOCAL}/Home`,
        element: <HOEM />
      },
      {
        path: `${HOME_PAGE_LOCAL}/Service`,
        element: <SERVICE_DETAIL />,
        children: [
          {
            path: ":PageName",
            element: <SERVICE_DETAIL />
          }
        ]
      },
    ],
  },
  {
    path: `${HOME_PAGE_LOCAL}/Service/Food-service/:Menu`,
    element: <FOOD_MENU />,
    children: [

    ]
  },
  {
    path: `${HOME_PAGE_LOCAL}/Service/Food-service/:Menu/:FoodId`,
    element: <FOOD_DETAIL />
  },
  {
    path: `${HOME_PAGE_LOCAL}/Service/Food-service/:Menu/Basket`,
    element: <BASKET />
  },
  {
    path: `${HOME_PAGE_LOCAL}/Service/Status-detail`,
    element: <STATUS_DETAIL />
  },
  {
    path: `${HOME_PAGE_LOCAL}/Reload-page`,
    element: <RELOAD />
  },

  // PAGE SETTING
  
]);