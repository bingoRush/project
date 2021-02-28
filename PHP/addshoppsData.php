<?php
    $telphone = $_GET['telphone'];
    $goods_id = $_GET['goods_id'];
    $goods_name = $_GET['goods_name'];
    $goods_price = $_GET['goods_price'];
    $cat_id = $_GET['cat_id'];
    $goods_url = $_GET['goods_url'];
    $goods_num = $_GET['goods_num'];


    $con = mysqli_connect('localhost','root','123456','project');
    $sql = "SELECT *  FROM `goodscar` WHERE `telphone` = '$telphone' AND `goods_id` = '$goods_id' AND `cat_id`='$cat_id'";
    
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    
    if(!$row){
        // 购物车的数据表中没有这条数据
        $addSql = "INSERT INTO `goodscar`(`ID`,`telphone`,`goods_id`,`goods_name`,`goods_price`,`cat_id`,`goods_url`,`goods_num`) VALUE(NULL,'$telphone','$goods_id','$goods_name','$goods_price','$cat_id','$goods_url','$goods_num')";
        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }else{

        $goods_num = ++$row['goods_num'];
        $updat = "UPDATE `goodscar` SET `goods_num` = '$goods_num' WHERE `telphone` = '$telphone' AND `goods_id` = '$goods_id' AND `cat_id`='$cat_id'";

        $updataRes = mysqli_query($con,$updat);

         if(!$updataRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$updataRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }


?>