import { GET_HOSPITAL_DETAIL } from "../../Config/Hospital-config";

let HOSPITAL_NAME = GET_HOSPITAL_DETAIL.HOSPITAL_NAME;
let HOSPITAL_LOGO = GET_HOSPITAL_DETAIL.HOSPITAL_LOGO;
let GET_DATA_PATH = GET_HOSPITAL_DETAIL.GET_DATA_PATH;

export let FOOD_PHOTO_PATH = GET_HOSPITAL_DETAIL.FOOD_PHOTO_PATH;
export let DEV_MORD = GET_HOSPITAL_DETAIL.DEV_MORD;
export let DATA_MOCK = 'OFF'; // HOW TO ON, OFF

export let HOME_PAGE_LOCAL = '/Patientin-room';

export let PATIENT_INFO = {
    PATIENT_INFO : `${GET_DATA_PATH}/Patient-info/Patient-info.php`
}

export let VISIT_SUMMARY = {

}

export let HOSPITAL_DETAIL = {
    HOSPITAL_NAME : HOSPITAL_NAME,
    HOSPITAL_LOGO : HOSPITAL_LOGO
}

export let SERVICE_PAGE = {
    ADD_SERVICE : `${GET_DATA_PATH}/Service-page/Add-service.php`
}

export let FOOD_MENU = {
    FOOD_MENU : `${GET_DATA_PATH}/Food-menu/Food-menu.php`,
    FOOD_TYPE : `${GET_DATA_PATH}/Food-menu/Food-type.php`,
    FOOD_DETAIL : `${GET_DATA_PATH}/Food-menu/Food-detail.php`
}

export let BASKET = {
    ORDER_IN_BASKET :  `${GET_DATA_PATH}/Food-menu/Basket/Order-in-basket.php`,
    COUNT_BASKET : `${GET_DATA_PATH}/Food-menu/Basket/Count-order-in-basket.php`,
    CONFIRM_ORDER : `${GET_DATA_PATH}/Food-menu/Basket/Confirm-order.php`,
    EDIT_ORDER : `${GET_DATA_PATH}/Food-menu/Basket/Edit-order.php`,
    DELETE_ORDER : `${GET_DATA_PATH}/Food-menu/Basket/Delete-order.php`,
}

export let ADD_ORDER_FOOD = {
    BASKET : `${GET_DATA_PATH}/Food-menu/Add-to-basket.php`
}

export let STATUS_DETAIL = {
    BILL_ID : `${GET_DATA_PATH}/Status-detail/Bill-id.php`,
    STATUS_DETAIL : `${GET_DATA_PATH}/Status-detail/Status-detail.php`,
    CANCEL_SERVICE : `${GET_DATA_PATH}/Status-detail/Cancel-service.php`,
} 