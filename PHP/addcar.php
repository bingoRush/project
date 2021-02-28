<?php

    $telphone = $_GET['telphone'];
    $goods_num = $_GET['goods_num'];
    $ID = $_GET['ID'];
    
    $con = mysqli_connect('localhost','root','123456','project');
    $sql = "UPDATE `goodscar` SET `goods_num` = '$goods_num' WHERE `telphone` = '$telphone' AND `ID` = '$ID'";
    
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