<?php

    include "../Config/Config.php";

    $NAME = $_GET['Name'];
    $AGE = $_GET['Age'];
    $WARD = $_GET['Ward'];
    $ROOM = $_GET['Room'];
    $BED = $_GET['Bed'];
    $OCM = $_GET['OcmCod'];
    $HN = $_GET['Hn'];
    $USER_TYPE = $_GET['UserType'];
    
    $QTY = $_POST['QTY'];
    $PRICE = $_POST['Menu-price'];
    $FOOD_ID = $_POST['Food-id'];
    $MORE = $_POST['More'];

    $CHECK = $con->query("  SELECT * FROM pirinf 
                            WHERE PirMnuCod = '$FOOD_ID' 
                            AND PirOcmNum = '$OCM' 
                            AND PirOdrDte = '$DATE'
                            AND PirOdrCmt = '$OCM'
                            AND PirOdrStt = 'N';");
    $COUNT = mysqli_num_rows($CHECK);

    if($COUNT > 0){

        while ( $row = $CHECK -> fetch_assoc())  {

            $UPDATE_QTY = $row['PirOdrQty'] += $QTY;

            $UPDATE_ = " UPDATE pirinf SET PirOdrQty = '$UPDATE_QTY' 
                            WHERE PirMnuCod = '$FOOD_ID'
                            AND PirOcmNum = '$OCM' 
                            AND PirOdrDte = '$DATE'
                            AND PirPatSrv = 'F'
                            AND PirOdrStt = 'N';";
            $con -> query($UPDATE_); 
            
        }

    }else{

        $ADD_BASKET = "INSERT INTO `pirinf`(

                                    `PirUserName`,
                                    `PirUserAge`,
                                    `PirWrdCod`,
                                    `PirRoomCod`,
                                    `PirBedCod`,
                                    `PirOcmNum`,
                                    `PirHn`,
                                    `PirPatSrv`,
                                    `PirOdrUser`,
                                    `PirMnuCod`,
                                    `PirOdrQty`,
                                    `PirPrcTyp`,
                                    `PirOdrDte`,
                                    `PirOdrTme`,
                                    `PirOdrStt`,
                                    `PirOdrCmt`

                                ) VALUES (
                                    
                                    '$NAME',
                                    '$AGE',
                                    '$WARD',
                                    '$ROOM',
                                    '$BED',
                                    '$OCM',
                                    '$HN',
                                    'F',
                                    'G',
                                    '$FOOD_ID',
                                    '$QTY',
                                    '$USER_TYPE',
                                    '$DATE',
                                    '$TIME',
                                    'N',
                                    '$MORE'

                                );";
        $con -> query($ADD_BASKET);

    }

?>