<?php

    include '../../Config/Config.php';

    $WARD = $_GET['Ward'];
    $ROOM = $_GET['Room'];
    $BED = $_GET['Bed'];
    $OCM = $_GET['Ocm'];

    $CHECK_BILL_ID = $con->query("  SELECT J1.PirBillCod1 as ID_BILL1, J1.PirBillCod2 as ID_BILL2 
                                    FROM pirinf J1
                                    INNER JOIN fodmst J2
                                    ON J1.PirMnuCod = J2.FodBitCod
                                    AND J1.PirPatSrv = 'F'
                                    ORDER BY ID_BILL2 DESC LIMIT 1");  

    while ( $row = $CHECK_BILL_ID -> fetch_assoc() ) {

        $ID1 = $row['ID_BILL1'];
        $ID2 = $row['ID_BILL2'];

        if($ID1 == 999){
            // 999
            $ID1 += 1;
        }

        if($ID1 != 999){
            $ID1 = 1;
        }


        if($ID2 == 999999){
            // 999999
            $ID2 = 1;
        }
        
        if($ID2 != 999999) {
            $ID2 += 1;
        }

        $UpdateUser = " UPDATE `pirinf` 
                        SET `PirBillCod1` = '$ID1', 
                            `PirBillCod2` = '$ID2',
                            `PirOdrTme` = '$TIME', 
                            `PirOdrStt` = 'R'
                        WHERE `PirOdrStt` = 'N'
                        AND`PirOcmNum` = '$OCM' 
                        AND PirWrdCod = '$WARD' 
                        AND PirRoomCod = '$ROOM' 
                        AND PirBedCod = '$BED'
                        AND PirOdrDte = '$DATE';";
        $con -> query($UpdateUser);

    }


?>