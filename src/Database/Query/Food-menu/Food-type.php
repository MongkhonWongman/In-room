<?php

    include '../Config/Config.php';

    $KITCHEN = $_GET['Kitchen'];
    
    $FOOD_TYPE = $con->query("SELECT * FROM `menu_type_mst` WHERE Tkitchen = '$KITCHEN';");
    while ( $row = $FOOD_TYPE->fetch_assoc())  {

        $dbdata[]=$row;

    }

    echo json_encode($dbdata);

?>