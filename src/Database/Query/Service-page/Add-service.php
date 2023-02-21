<?php
    include '../Config/Config.php';

    $WARD = $_GET['Ward'];
    $ROOM = $_GET['Room'];
    $BED = $_GET['Bed'];

    $NAME = $_GET['Name'];
    $AGE = $_GET['Age'];
    $OCM = $_GET['OcmCod'];
    $HN = $_GET['Hn'];
    $SERVICE_TYPE = $_GET['Page_key'];
    $VALUE_SERVICE = $_POST['Value-service'];
    $MORE = $_POST['More'];


    $COUNT = count($VALUE_SERVICE);
    for($i = 0; $i < $COUNT; $i++){

        $DATA = $VALUE_SERVICE;

        if($DATA[$i] === 'สอบถาม อื่นๆ'){

            $ADD_SERVICE = "INSERT INTO `pirinf`(
                                `PirWrdCod`,
                                `PirRoomCod`,
                                `PirBedCod`,
                                `PirOcmNum`,
                                `PirOdrDte`,
                                `PirPatSrv`,
                                `PirOdrTme`,
                                `PirOdrStt`,
                                `PirOdrCmt`,
                                `PirSelStt`

                            ) VALUES (
                                '$WARD',
                                '$ROOM',
                                '$BED',
                                '$OCM',
                                '$DATE',
                                '$SERVICE_TYPE',
                                '$TIME',
                                'C',
                                '$MORE',
                                '$DATA[$i]'
                            );";
            $con -> query($ADD_SERVICE);

        }else{

            
            $ADD_SERVICE = "INSERT INTO `pirinf`(
                                `PirWrdCod`,
                                `PirRoomCod`,
                                `PirBedCod`,
                                `PirOcmNum`,
                                `PirOdrDte`,
                                `PirPatSrv`,
                                `PirOdrTme`,
                                `PirOdrStt`,
                                `PirOdrCmt`,
                                `PirSelStt`

                            ) VALUES (
                                '$WARD',
                                '$ROOM',
                                '$BED',
                                '$OCM',
                                '$DATE',
                                '$SERVICE_TYPE',
                                '$TIME',
                                'C',
                                '',
                                '$DATA[$i]'
                            );";
            $con -> query($ADD_SERVICE);

        }


    }

?>