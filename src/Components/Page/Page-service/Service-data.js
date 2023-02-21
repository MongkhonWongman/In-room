import {BG_FOOD, BG_PRICE, BG_NURSE, BG_SERVICE, BG_VISIT} from '../Home/Box-page-service';

// NURSE SERVICE ICON
import NURSE_ICON_1_ON from '../../../img/Nurse-service-icon/Nurse-service-on-1.png';
import NURSE_ICON_1_OFF from '../../../img/Nurse-service-icon/Nurse-service-off-1.png';

import NURSE_ICON_2_ON from '../../../img/Nurse-service-icon/Nurse-service-on-2.png';
import NURSE_ICON_2_OFF from '../../../img/Nurse-service-icon/Nurse-service-off-2.png';

import NURSE_ICON_3_ON from '../../../img/Nurse-service-icon/Nurse-service-on-3.png';
import NURSE_ICON_3_OFF from '../../../img/Nurse-service-icon/Nurse-service-off-3.png';


// ASSISTANT SERVICE ICON
import ASSISTANT_ICON_1_ON from '../../../img/Assistant-service-icon/Assistant-service-on-1.png';
import ASSISTANT_ICON_1_OFF from '../../../img/Assistant-service-icon/Assistant-service-off-1.png';

import ASSISTANT_ICON_2_ON from '../../../img/Assistant-service-icon/Assistant-service-on-2.png';
import ASSISTANT_ICON_2_OFF from '../../../img/Assistant-service-icon/Assistant-service-off-2.png';

import ASSISTANT_ICON_3_ON from '../../../img/Assistant-service-icon/Assistant-service-on-3.png';
import ASSISTANT_ICON_3_OFF from '../../../img/Assistant-service-icon/Assistant-service-off-3.png';


// Kitchen-icon
import KITCHEN_1 from '../../../img/Kitchen-icon/Halal.png';
import KITCHEN_2 from '../../../img/Kitchen-icon/Danbery.png';
import KITCHEN_3 from '../../../img/Kitchen-icon/FoodHouse.png';


import ICON_4_ON from '../../../img/Nurse-service-icon/Nurse-service-on-4.png';
import ICON_4_OFF from '../../../img/Nurse-service-icon/Nurse-service-off-4.png';


export let NURSE_SERVICE = [
    {   
        "Key" : 1,
        "ON" : NURSE_ICON_1_ON,
        "OFF" : NURSE_ICON_1_OFF,
        "Title":"สอบถามเรื่องยา"
    },
    {   
        "Key" : 2,
        "ON" : NURSE_ICON_2_ON,
        "OFF" : NURSE_ICON_2_OFF,
        "Title":"เช็ดตัว"
    },
    {   
        "Key" : 3,
        "ON" : NURSE_ICON_3_ON,
        "OFF" : NURSE_ICON_3_OFF,
        "Title":"ปรับเตียง"
    },
    {   
        "Key" : 4,
        "ON" : ICON_4_ON,
        "OFF" : ICON_4_OFF,
        "Title":"สอบถาม อื่นๆ"
    },
];


export let ASSISTANT_SERVICE = [
    {   
        "Key" : 1,
        "ON" : ASSISTANT_ICON_1_ON,
        "OFF" : ASSISTANT_ICON_1_OFF,
        "Title":"ทำความสอาดห้องผู้ป่วย"
    },
    {   
        "Key" : 2,
        "ON" : ASSISTANT_ICON_2_ON,
        "OFF" : ASSISTANT_ICON_2_OFF,
        "Title":"ทำความสอาดห้องน้ำ"
    },
    {   
        "Key" : 3,
        "ON" : ASSISTANT_ICON_3_ON,
        "OFF" : ASSISTANT_ICON_3_OFF,
        "Title":"เปลี่ยนผ้าปู ปลอกหมอน"
    },
    {   
        "Key" : 4,
        "ON" : ICON_4_ON,
        "OFF" : ICON_4_OFF,
        "Title":"สอบถาม อื่นๆ"
    },
];


export let FOOD_SERVICE_RAM = [
    {   
        "Key" : 1,
        "ON" : KITCHEN_1,
        "OFF" : KITCHEN_1,
        "Backgtound" : BG_FOOD,
        "Kitchen_cod" : 'K001',
        "Title":"อิสลาม"
    },
    {   
        "Key" : 2,
        "ON" : KITCHEN_2,
        "OFF" : KITCHEN_2,
        "Backgtound" : BG_FOOD,
        "Kitchen_cod" : 'K002',
        "Title":"แดนเบอร์รี่"
    },
    {   
        "Key" : 3,
        "ON" : KITCHEN_3,
        "OFF" : KITCHEN_3,
        "Backgtound" : BG_FOOD,
        "Kitchen_cod" : 'K003',
        "Title":"ฟู้ดเฮ้าส์"
    }
];


export let FOOD_SERVICE_CMR = [
    {   
        "Key" : 1,
        "ON" : ASSISTANT_ICON_1_ON,
        "OFF" : ASSISTANT_ICON_1_OFF,
        "Backgtound" : BG_FOOD,
        "Title":"เมนูพิเศษ"
    },
    {   
        "Key" : 2,
        "ON" : ASSISTANT_ICON_2_ON,
        "OFF" : ASSISTANT_ICON_2_OFF,
        "Backgtound" : BG_FOOD,
        "Title":"เมนูประจำวัน"
    }
];