<?php

    // ===================== //
    // CONFIG DATABASE       //
    // ===================== //
    include "../Config/Config.php";
    include "../Procedure-config/Procedure-config.php";

    // ====================== //
    // สำคัญ                  //
    // ===================== //
    header("Access-Control-Allow-Origin: *");

    $Ocmnum = $_GET['ocmnum'];

    $FileContents = file_get_contents("http://".$IP."/InRoom/DBService?dbServiceName=IRPatientToday_Visitsummary&ocmnum=%20%20".$Ocmnum."");

    echo $FileContents;

?>