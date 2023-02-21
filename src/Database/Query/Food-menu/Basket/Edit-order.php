<?php

    include '../../Config/Config.php';

    $SEQ = $_GET['Seq'];
    $USER = $_GET['UserType'];
    $MORE = $_POST['More'];
    $UPDATE_QTY = $_POST['QTY-FOR-EDIT'];

    $UPDATE_ = " UPDATE pirinf SET 
                    PirOdrQty = '$UPDATE_QTY',
                    PirOdrCmt = '$MORE',
                    PirPrcTyp = '$USER'
                    WHERE PirSeq = '$SEQ'
                    AND PirOdrDte = '$DATE';";
    $con -> query($UPDATE_); 

    echo($UPDATE_);

?>