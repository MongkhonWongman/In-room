<?php

    include '../Config/Config.php';

    $WARD = $_GET['Ward'];
    $ROOM = $_GET['Room'];
    $BED = $_GET['Bed'];
    $OCM = $_GET['Ocm'];
    $TYPE_SERVICE = $_GET['Page_key'];
    
    $dbdata = array();
   
    $FOOD_DETAIL = $con->query("   SELECT *, 
                                            DATE_FORMAT(J1.PirOdrDte,'%d-%m-%Y') As PirOdrDte, 
                                            TIME_FORMAT(J1.PirOdrTme, '%i:%S') As PirOdrTme
                                        FROM pirinf J1
                                        INNER JOIN fodmst J2
                                        ON J1.PirMnuCod = J2.FodBitCod
                                        WHERE J1.PirWrdCod ='$WARD'
                                            AND J1.PirRoomCod = '$ROOM'
                                            AND J1.PirBedCod = '$BED'
                                            AND J1.PirOdrDte = '$DATE'
                                            AND J1.PirPatSrv = '$TYPE_SERVICE'
                                            AND J1.PirOdrStt != 'N'
                                            AND J1.PirOdrStt != 'F'
                                            AND J1.PirOdrUser = 'G'
                                        ORDER BY PirSeq");    
 
    while ( $row = $FOOD_DETAIL->fetch_assoc())  {
            
        $dbdata[] = $row;
       
    }


    $SERVICE_DETAIL = $con->query("   SELECT *, 
                                            DATE_FORMAT(J1.PirOdrDte,'%d-%m-%Y') As PirOdrDte, 
                                            TIME_FORMAT(J1.PirOdrTme, '%i:%S') As PirOdrTme
                                        FROM pirinf J1
                                        WHERE J1.PirWrdCod ='$WARD'
                                            AND J1.PirRoomCod = '$ROOM'
                                            AND J1.PirBedCod = '$BED'
                                            AND J1.PirOdrDte = '$DATE'
                                            AND J1.PirPatSrv = '$TYPE_SERVICE'
                                            AND J1.PirOdrStt != 'N'
                                            AND J1.PirOdrStt != 'F'
                                            AND J1.PirMnuCod = ''
                                        ORDER BY PirSeq");

    while ( $row = $SERVICE_DETAIL->fetch_assoc())  {

        if($row['PirOdrStt'] === 'C'){
            // ห้องอาหารรับ Order
            $row['PirOdrStt'] = 'รอดำเนินการ';
        }

        if($row['PirOdrStt'] === 'P'){
            // กำลังปรุง
            $row['PirOdrStt'] = 'กำลังดำเนินการ';
        }

        if($row['PirOdrStt'] === 'F'){
            // เตรียมจัดส่ง
            $row['PirOdrStt'] = 'เสร็จสิ้น';
        }

        $dbdata[] = $row;

    }

    echo json_encode($dbdata);

?>