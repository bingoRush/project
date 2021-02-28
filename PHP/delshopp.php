<?php

    //链接数据库
    $telphone = $_GET['telphone'];
    $ID = $_GET['ID'];


    $con = mysqli_connect('localhost','root','123456','project');

    $sql = "DELETE FROM `goodscar` WHERE `telphone` = '$telphone' AND `ID` = '$ID'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库错误' . mysql_error($con));
    }

    $arr = array('code'=>$res,'msg'=>'删除数据成功');
    print_r(json_encode(($arr),JSON_UNESCAPED_UNICODE));






?>