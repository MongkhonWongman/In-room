<?php

    include "../Config/Config.php";

    $seq = $_GET['seq'];
    $ocm = $_GET['ocmnum'];

    $FileContents = file_get_contents("http://".$TOMCAT_SERVICE."/InRoom/DBService?dbServiceName=IRPatient_Visitsummary_Detail&seq=".$seq."&ocmnum=%20%20".$ocm);
    echo $FileContents;

?>