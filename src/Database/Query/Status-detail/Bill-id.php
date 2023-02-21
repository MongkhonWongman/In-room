<?php

    include '../Config/Config.php';

    $WARD = $_GET['Ward'];
    $ROOM = $_GET['Room'];
    $BED = $_GET['Bed'];

    $dbdata = array();
   
    $confirm_fastfood = $con->query("SELECT
                                        DISTINCT PirBillCod1,
                                        PirBillCod2,
                                        PirWrdCod,
                                        PirRoomCod,
                                        PirBedCod,
                                        PirUserName,
                                        PirHn,
                                        PirUserAge,
                                        PirOdrStt,
                                        TIME_FORMAT(pirinf.PirOdrTme, '%i:%S') As PirOdrTme
                                    FROM
                                        pirinf
                                    WHERE PirPatSrv = 'F'
                                        AND PirOdrStt != 'F'
                                        AND PirOdrStt != 'N'
                                        AND PirOdrDte = '$DATE'
                                        ORDER BY PirSeq;");    
 
    while ( $row = $confirm_fastfood->fetch_assoc())  {

        if($row['PirOdrStt'] === 'R'){
            // สั่งอาหารสำเร็จ
            $row['PirOdrStt'] = 'สั่งอาหารสำเร็จ';
        }

        if($row['PirOdrStt'] === 'C'){
            // ห้องอาหารรับ Order
            $row['PirOdrStt'] = 'ห้องอาหารรับ Order';
        }

        if($row['PirOdrStt'] === 'P'){
            // กำลังปรุง
            $row['PirOdrStt'] = 'กำลังปรุง';
        }

        if($row['PirOdrStt'] === 'F'){
            // เตรียมจัดส่ง
            $row['PirOdrStt'] = 'เตรียมจัดส่ง';
        }
            
        $dbdata[] = $row;
       
    }

    echo json_encode($dbdata);

?>