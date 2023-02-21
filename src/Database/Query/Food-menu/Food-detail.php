<?php

    include '../Config/Config.php';

    $FOOD_ID = $_GET['FoodId'];

    if(isset($_GET['SeqEdit'])){

        $SEQ = $_GET['SeqEdit'];

        $FOOD_DETAIL = $con->query("SELECT *, $SET_FOOD_NAME FROM pirinf J1 
                                    INNER JOIN fodmst J2 
                                    ON J1.PirMnuCod = J2.FodBitCod 
                                    WHERE PirSeq = '$SEQ';");

        while ( $row = $FOOD_DETAIL->fetch_assoc())  {

            $dbdata[]=$row;

        }
        

    }else{

        $FOOD_DETAIL = $con->query("SELECT *, $SET_FOOD_NAME FROM `fodmst` WHERE FodBitCod = '$FOOD_ID';");
        while ( $row = $FOOD_DETAIL->fetch_assoc())  {

            $dbdata[]=$row;

        }

    }

    echo json_encode($dbdata);

?>