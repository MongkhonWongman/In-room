<?php

    include "../Config/Config.php";


    $Ward = $_GET['Ward'];
    $Room = $_GET['Room'];
    $Bed = $_GET['Bed'];

    $FileContents = file_get_contents($TOMCAT_SERVICE."IRGetPatientInfo&Ward=".$Ward."&Room=".$Room."&Bed=".$Bed);

    echo $FileContents;

?>