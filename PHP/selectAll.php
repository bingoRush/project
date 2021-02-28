<?php
    $res_select = $_GET['res_select'];
    $telphone = $_GET['telphone'];
    $idx = $_GET['idx'];
    
    $con = mysqli_connect('localhost','root','123456','project');

    if(!$idx){
        $sql = "UPDATE `goodscar` SET `is_select`='$res_select'   WHERE `telphone`='$telphone' ";
        

    }else{
        $sql = "UPDATE `goodscar` SET `is_select`='$res_select'   WHERE `telphone`='$telphone' AND `ID`='$idx' ";
    }
    // $sql = "SELECT * FROM `goodscar` WHERE `telphone`='$telphone'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die("数据库链接错误".mysqli_error($con));
    }
    

    $arr = array();
    $row = mysqli_fetch_assoc($res);

    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }

    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>