<?php

    include '../Config/Config.php';

    $SEQ = $_GET['Seq'];

    $DeleteData = "DELETE FROM `pirinf` WHERE `PirSeq` = '$SEQ';";
    $con -> query($DeleteData);


?>