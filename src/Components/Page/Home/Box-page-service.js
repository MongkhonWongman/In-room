import NURSE from '../../../img/Img-service/Inroom1.jpg';
import SERVICE from '../../../img/Img-service/Inroom2.jpg';
import FOOD from '../../../img/Img-service/Inroom3.jpg';
import VISIT from '../../../img/Img-service/inroom4.jpg';
import PRICE from '../../../img/Img-service/inroom5.jpg';
import { HOME_PAGE_LOCAL } from '../../API/API';

export let BG_NURSE = NURSE;
export let BG_SERVICE = SERVICE;
export let BG_FOOD = FOOD;
export let BG_VISIT = VISIT;
export let BG_PRICE = PRICE;



export let PAGE_SERVICE = [
    {   
        "Page_key" : 'N',
        "To_page": `${HOME_PAGE_LOCAL}/Service/Nurse-service`,
        "Path_name" : 'Nurse-service',
        "Service_photo" : BG_NURSE,
        "Tiele":"บริการพยาบาล",
        "Detail": "หากมีคำถาม ที่ต้องการสอบถามเพิ่มเติมสอบถามได้ทันที"
    },
    {
        "Page_key" : 'A',
        "To_page": `${HOME_PAGE_LOCAL}/Service/Assistant-service`,
        "Path_name" : 'Assistant-service',
        "Service_photo" : BG_SERVICE,
        "Tiele":"บริการผู้ช่วย",
        "Detail": "เรียกบริการแม่บ้าน ได้เองทันที"
    },
    {
        "Page_key" : 'F',
        "To_page": `${HOME_PAGE_LOCAL}/Service/Food-service`,
        "Path_name" : 'Food-service',
        "Service_photo" : BG_FOOD,
        "Tiele":"สั่งอาหารและเครื่องดื่ม",
        "Detail": "บริการออนไลน์สั่งอาหารจากครัว รพ. ได้ด้วยตนเอง"
    },

    {
        "Page_key" : 'After',
        "To_page": `${HOME_PAGE_LOCAL}/Service/After-visit-summary`,
        "Path_name" : 'After-visit-summary',
        "Service_photo" : BG_VISIT,
        "Tiele":"After Visit Summary",
        "Detail": "สรุปหลังการเยี่ยมไข้"
    },
    {
        "To_page": `${HOME_PAGE_LOCAL}/Service/Nuse-service`,
        "Service_photo" : BG_PRICE,
        "Tiele":"ค่ารักษาพยาบาล",
        "Detail": "รายละเอียดค่าใช้จ่ายต่างๆ"
    },

];