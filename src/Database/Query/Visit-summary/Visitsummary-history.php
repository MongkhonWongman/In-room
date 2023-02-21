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

    $ocmnum = $_GET['ocmnum'];

    // server
    //$FileContents = file_get_contents("http://localhost:8080/InRoom/DBService?dbServiceName=IRPatient_Visitsummary_History&ocmnum=%20%20".$ocmnum."");

    // เครื่อง ท่งสง
    $FileContents = file_get_contents("http://".$IP."/InRoom/DBService?dbServiceName=IRPatient_Visitsummary_History&ocmnum=%20%20".$ocmnum."");

    echo $FileContents;

?>