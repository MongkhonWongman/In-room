<?php

    include '../../Config/Config.php';

    $WARD = $_GET['Ward'];
    $ROOM = $_GET['Room'];
    $BED = $_GET['Bed'];

    $query = $con->query("  SELECT FORMAT(SUM(`fodmst`.`FodPrcNum` * `pirinf`.`PirOdrQty`), 0) Amount_N, SUM(`pirinf`.`PirOdrQty`) SumQTY_N
                            FROM `pirinf` 
                            INNER JOIN `fodmst` 
                                ON `pirinf`.`PirMnuCod` = `fodmst`.`FodBitCod`
                            WHERE `pirinf`.`PirOdrStt` = 'N'
                                AND `pirinf`.`PirWrdCod` = '$WARD'
                                AND `pirinf`.`PirRoomCod` = '$ROOM'
                                AND `pirinf`.`PirBedCod` = '$BED'
                                AND `pirinf`.`PirOdrDte` = '$DATE';
                        ");

    while ( $row = $query -> fetch_assoc())  {
        $dbdata[] = $row;
    }

    echo json_encode($dbdata);

?>