<?php

    include '../Config/Config.php';

    $KITCHEN = $_GET['Kitchen'];

    if(isset($_GET['Type'])){

        $FOOD = $con->query("SELECT * FROM `fodmst` WHERE FodKitCod = '$KITCHEN' AND FodStt = 'Y';");
        while ( $row = $FOOD->fetch_assoc())  {

            $dbdata[]=$row;

        }

    }else{

        $FOOD = $con->query("SELECT *, $SET_FOOD_NAME FROM `fodmst` WHERE FodKitCod = '$KITCHEN' AND FodStt = 'Y';");
        while ( $row = $FOOD->fetch_assoc())  {

            $dbdata[]=$row;

        }


    }

    echo json_encode($dbdata);

?>