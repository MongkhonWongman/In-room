import RAM_LOGO from '../img/Icon-hospital/RAM/RAM-LOGO3.png';
import CMR_LOGO from '../img/Icon-hospital/CMR/CMR-LOGO3.png';

// HOW TO KEY ON, OFF
let DEV_MORD = 'ON';

// HOSPITAL NAME
let RAM = 'RAM';
let CMR = 'CMR';
let TTH = 'TTH';
let HOSPITAL_NAME = RAM; // แก้ไขเมื่อเปลี่ยน รพ. <<<


let GET_DATA_PATH = '';
let FOOD_PHOTO_PATH = '';
let HOSPITAL_LOGO = '';

if(DEV_MORD === 'ON'){

    //------------------------------------//
    //            FOR DEV MORD            //
    //------------------------------------//
    if(HOSPITAL_NAME === 'RAM'){
        HOSPITAL_LOGO = RAM_LOGO;
    }

    if(HOSPITAL_NAME === 'CMR'){
        HOSPITAL_LOGO = CMR_LOGO;
    }

    GET_DATA_PATH = 'http://localhost/New-patientin-room/Patientin-room/my-app/src/Database/Query';
    FOOD_PHOTO_PATH = 'http://localhost/New-patientin-room/Patientin-room/my-app/src/Database/Food-photo';

}else{

    //------------------------------------//
    //           FOR PRODUCTION           //
    //------------------------------------//
    if(HOSPITAL_NAME === 'RAM'){

        HOSPITAL_LOGO = RAM_LOGO;
        GET_DATA_PATH = 'http://43.133.96.67/Patientin-room/Database/Query';
        FOOD_PHOTO_PATH = 'http://43.133.96.67/Paientin-room/Database/Food-photo';

    }

    
    if(HOSPITAL_NAME === 'CMR'){

        HOSPITAL_LOGO = CMR_LOGO;
        GET_DATA_PATH = 'http://localhost/New-patientin-room/Patientin-room/my-app/src/Database/Query';
        FOOD_PHOTO_PATH = 'http://localhost/New-patientin-room/Patientin-room/my-app/src/Database/Food-photo';

    }

}

export let GET_HOSPITAL_DETAIL = {
    HOSPITAL_NAME : HOSPITAL_NAME,
    DEV_MORD : DEV_MORD,
    HOSPITAL_LOGO : HOSPITAL_LOGO,
    FOOD_PHOTO_PATH : FOOD_PHOTO_PATH,
    GET_DATA_PATH : GET_DATA_PATH
};