<?php

    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('Asia/Bangkok');

    $DATE = date("Ymd");
    $TIME = date("Hi");

    // HOSPITAL
    $RAM = 'RAM';
    $CMR = 'CMR';
    $TTH = 'TTH';

    $TABLE = '';
    $TOMCAT_SERVICE = '';

    $HOSPITAL_NAME = $TTH; // แก้ไขเมื่อเปลี่ยน รพ. <<< 

    if($HOSPITAL_NAME === 'TTH'){

        $TABLE = 'ir_ram';
        $TOMCAT_SERVICE = 'http://10.88.3.14:8080/InRoom/DBService?dbServiceName=';

    }


    if($HOSPITAL_NAME === 'RAM'){

        $TABLE = 'ir_ram';
        $TOMCAT_SERVICE = 'http://rkh-brbapp01.rhg.com:8080/InRoom/DBService?dbServiceName=';

    }

    if($HOSPITAL_NAME === 'CAM'){

        $TABLE = 'ir_cmr';
        $TOMCAT_SERVICE = '';
        
    }


    // CONNECT DATABASE
    $con = new mysqli("localhost", "root", "brbadmin", $TABLE);
    $con -> query("SET CHARACTER SET utf8");

    $SET_FOOD_NAME = "REPLACE( REPLACE( FodMnuNamThai, '[IS]', ''), '[FH]', '') AS FoodNameDisplay_TH, REPLACE( REPLACE( FodMnuNamEing, '[IS]', ''), '[FH]', '') AS FoodNameDisplay_ENG";

?>