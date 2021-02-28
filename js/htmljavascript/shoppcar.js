let cookie = getCookie('login');
let location_search = location.href

if (cookie) {
    $('.username_ p').html(cookie);
    $('.username_').css('display', 'block')
    $('.register_').css('display', 'none')
    $('.exit').click(function (e) {
        console.log(666);
        e.preventDefault()
        $('.exit_box').css({
            display: 'block',
            top: 0,
            left: innerWidth / 2 - 170,

        })
        $('#zhezhao').height($('body').height()).css('display', 'block')
        $('.exit_box button').click(function () {
            $('#zhezhao').height($('body').height()).css('display', 'none')
            $(this).parents('.exit_box').css('display', 'none')
        })
        $('.sure').click(function () {

            setCookie('login', cookie, -1)
            location.href = './home_page.html'

        })
    })

    $('.username_').mouseover(function () {

        $('.login_').css('display', 'block')
    }).mouseout(function () {
        $('.login_').css('display', 'none')
    })

    $('.login_').mouseover(function () {

        $('.login_').css('display', 'block')
    }).mouseout(function () {
        $('.login_').css('display', 'none')
    })

    // 用户已经登录 渲染数据

    $.ajax({
        url: '../PHP/shoppcar.php',
        data: {
            telphone: cookie
        },
        success: function (res) {
            function reset(res) {
                let res_ = JSON.parse(res)
                console.log(res);
                res_.reverse()
                let html = ``
                res_.forEach(item => {
                    html += `
                <ul class="car_list">
                    <li><input type="checkbox" class="choose" idx="${item.ID}" isSelect="${item.is_select}"> </li>
                    <li><img src="${item.goods_url}" alt="">${item.goods_name}</li>
                    <li>${item.goods_price}元</li>
                    <li><button class="subtract" idx_="${item.ID}">-</button><span class="goodsNum">${item.goods_num}</span><button  idx_="${item.ID}" class="add">+</button></li>
                    <li>${item.goods_price}元</li>
                    <li><div class="del" idx_="${item.ID}"><span class="iconfont icon-shanchu1"></span></div></li>
    
                </ul>
                `
                })

                $('#car').html(html);

                // 判断渲染的数据 被选中的值
                function all_choose(res_) {
                    console.log(res_);
                    if (res_.length > 0) {
                        let every_ = res_.every(function (item) {
                            return item.is_select == 1
                        })

                        if (every_) {
                            $('.all_choose')[0].checked = true

                        } else {
                            $('.all_choose')[0].checked = false
                        }
                        $('.choose').each((index_id, item_a) => {

                            if ($(item_a).attr('isSelect') == 1) {
                                $(item_a)[0].checked = true
                            } else {
                                $(item_a)[0].checked = false
                            }
                        })
                    }else{
                        $('.all_choose')[0].checked = false
                    }

                }
                all_choose(res_)

                // // 全选和单选框
                $(document).on('click', '.all_choose,.choose', function (e) {
                    if (e.target.classList == 'all_choose') {
                        let is_select
                        let arr_select = []
                        $('.choose').each((index, item) => {
                            arr_select.push($(item).attr('isselect'))
                        })
                        let z = arr_select.includes("0")
                        if (z) {
                            is_select = 1
                        } else {
                            is_select = 0
                        }
                        $.ajax({
                            url: '../PHP/selectAll.php',
                            data: {
                                res_select: is_select,
                                telphone: cookie,
                            },
                            success: function () {
                                $.ajax({
                                    url: '../PHP/shoppcar.php',
                                    data: {
                                        telphone: cookie
                                    },
                                    async: false,
                                    success: function (res2) {
                                        let res_ = JSON.parse(res2)
                                        $('.choose').attr('isselect', is_select)

                                        all_choose(res_)
                                        change_data_s(res_)



                                    }
                                })

                            },
                            error: function (err) {
                                console.log(err);
                            }
                        })


                    } else {
                        let is_select = $(e.target).attr('isselect')
                        if (is_select == 0) {

                            is_select = 1
                        } else {
                            is_select = 0
                        }
                        $(e.target).attr('isselect', is_select)

                        let idx = $(e.target).attr('idx')

                        $.ajax({
                            url: '../PHP/selectAll.php',
                            data: {
                                res_select: is_select,
                                telphone: cookie,
                                idx: idx
                            },
                            success: function () {
                                $.ajax({
                                    url: '../PHP/shoppcar.php',
                                    data: {
                                        telphone: cookie
                                    },
                                    async: false,
                                    success: function (res1) {

                                        let res_ = JSON.parse(res1)
                                        all_choose(res_)
                                        change_data_s(res_)


                                    }
                                })

                            },
                            error: function (err) {
                                console.log(err);
                            }
                        })



                    }
                })

                //计算商品数量和被选中数量

                function change_data_s(res_) {
                    let total = 0
                    res_.forEach(item => {
                        total += item.goods_num * 1
                    })

                    $('.total').html(total);
                    let arr_num = res_.filter(item_num => {
                        return item_num.is_select == 1
                    })

                    let choose_num = 0
                    let totalPrice = 0
                    arr_num.forEach(item_ => {

                        totalPrice += item_.goods_price * item_.goods_num
                        choose_num += item_.goods_num * 1
                    })

                    $('.choose_count').html(choose_num)
                    $('.price').html(totalPrice)
                }





                // //计算商品数量和被选中数量
                function change_data() {
                    $.ajax({
                        url: '../PHP/shoppcar.php',
                        data: {
                            telphone: cookie
                        },
                        success: function (res) {
                            let res_ = JSON.parse(res)
                            change_data_s(res_)

                        },
                    })

                }

                change_data()

                // 数量加减
                $(".add").click(function () {

                    let a = $(this)

                    let goodsNum = $(this).parent().find('.goodsNum').html()
                    let idx_ = $(this).attr('idx_')
                    goodsNum++
                    $.ajax({
                        url: '../PHP/addcar.php',
                        data: {
                            goods_num: goodsNum,
                            telphone: cookie,
                            ID: idx_
                        },
                        success: function (res) {
                            a.parent().find('.goodsNum').html(goodsNum)
                            change_data()
                        },

                    })

                })

                $(".subtract").click(function () {
                    let s = $(this)
                    let goodsNum = $(this).parent().find('.goodsNum').html()
                    let idx_ = $(this).attr('idx_')
                    // console.log(idx_);
                    if (goodsNum > 1) {
                        goodsNum--
                        // console.log(goodsNum);

                        $.ajax({
                            url: '../PHP/addcar.php',
                            data: {
                                goods_num: goodsNum,
                                telphone: cookie,
                                ID: idx_
                            },
                            success: function (res) {
                                s.parent().find('.goodsNum').html(goodsNum)
                                change_data()
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        })


                    }


                })


                // 删除商品
                $('.del').click(function () {
                    console.log(666);
                    let idx_ = $(this).attr('idx_')
                    $.ajax({
                        url: '../PHP/delshopp.php',
                        data: {

                            telphone: cookie,
                            ID: idx_
                        },
                        success: function (res) {
                            console.log(666);
                            $.ajax({
                                url: '../PHP/shoppcar.php',
                                data: {
                                    telphone: cookie
                                },
                                async: false,
                                success: function (res) {
                                    reset(res)

                                }
                            })
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                })



            }
            reset(res)
        },
        error: function (err) {
            console.log(err);
        }
    })



} else {
    alert('请先登录')
    location.href = './denglu.html'

}

