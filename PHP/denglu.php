<?php
    $phone = $_GET['phone'];
    $con = mysqli_connect('localhost','root','123456','project');


    $sql = "SELECT * FROM `login` WHERE `telphone`='$phone' ";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误'.mysqli_error($con));
    }

    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    if($arr){
        
        array_push($arr,array('code'=>1));
        print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
        
    }else{
        array_push($arr,array('msg'=>'账户不存在'));
        array_push($arr,array('code'=>0));
        print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
    }

?>