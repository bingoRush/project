// 获取传过来的URL参数
var params = location.search
console.log(params);
params = params.slice(1, )

var arr_params = params.split('&')
// console.log(arr_params);
var data = {}
arr_params.forEach(item => {
    var arr_item = item.split('=')
    // console.log(arr_item);
    data[arr_item[0]] = decodeURI(arr_item[1])


})
// console.log(data.id, data.name);
if (/kind/ig.test(params)) {
    // 渲染页面数据

    $.ajax({
        url: '../js/top_goods_list.json',
        data: {
            id: data.id,
            name: data.name
        },
        success: function (res) {
            res.forEach(item => {
                item.children.forEach(item_ => {
                    if (item_.id == data.id && item_.name == data.name) {
                        $('.goods_massage .lf>img').attr("src", `${item_.url}`)
                        $('.rg h1').html(item_.goods_intruduce)
                        $('.price_in').html(item_.price)
                        $($('.mid_msg a')[1]).html(item_.kind)
                        $('.mid_msg span').html(item_.goods_intruduce)
                        $($('.pic img')[0]).attr("src", `${item_.small_url1}`)
                        $($('.pic img')[1]).attr("src", `${item_.small_url2}`)
                        $($('.pic img')[2]).attr("src", `${item_.small_url3}`)
                        $($('.pic img')[3]).attr("src", `${item_.small_url4}`)
                        $($('.pic img')[4]).attr("src", `${item_.small_url5}`)
                        let middle_img_length = item_.bigPic_length
                        // console.log(middle_img_length, item_);

                        for (var i = 0; i < middle_img_length - 1; i++) {
                            let img_ = $('<img src="" alt="">')
                            $('.middle_').append(img_)
                        }

                        // console.log($('.middle_ img'));
                        $($('.middle_ img')[0]).attr("src", `${item_.bigPic_url1}`)
                        $($('.middle_ img')[1]).attr("src", `${item_.bigPic_url2}`)
                        $($('.middle_ img')[2]).attr("src", `${item_.bigPic_url3}`)
                        $($('.middle_ img')[3]).attr("src", `${item_.bigPic_url4}`)
                        $($('.middle_ img')[4]).attr("src", `${item_.bigPic_url5}`)
                        $($('.middle_ img')[5]).attr("src", `${item_.bigPic_url6}`)
                        $($('.middle_ img')[6]).attr("src", `${item_.bigPic_url7}`)
                        $($('.middle_ img')[7]).attr("src", `${item_.bigPic_url8}`)
                        $($('.middle_ img')[8]).attr("src", `${item_.bigPic_url9}`)
                        $($('.middle_ img')[9]).attr("src", `${item_.bigPic_url10}`)
                    }
                })
            })
        },
        error: function (err) {
            console.log(err);
        }
    })
} else {
    $.ajax({
        url: '../js/goos_list.json',
        success: function (res) {
            // console.log(res);
            res.forEach(item => {
                if (item.name == data.name) {

                    item.child_lists.forEach(item_ => {
                        if (item_.id == data.id) {

                            $('.lf >img').attr('src', item_.url)
                            $('.price_in').html(item_.price)
                            $('.rg h1').html(item_.goods_intro)
                        }
                    })
                }
            })
        },
        error: function (err) {
            console.log(err);
        }
    })
}


// 点击按钮改变数量
let goods_num = 1
$('.goods_num').val(goods_num)
$('.add').click(function () {
    goods_num++
    $('.goods_num').val(goods_num)

})
$('.subtract').click(function () {
    if (goods_num >= 1) {
        $('.goods_num').val(goods_num)
        goods_num--

    }

})






// 用户登录
localStorage.removeItem('web_stroge');
let location_search = location.href
$('.register_').click(function (e) {
    localStorage.setItem('web_stroge', location_search);


})

// 获取页面的cookie
let cookie = getCookie('login');
// console.log(cookie);
if (cookie) {
    $('.username_ p').html(cookie);
    $('.username_').css('display', 'block')
    $('.register_').css('display', 'none')
}
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
        location.href = location_search

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


// 点击加入购物车
$('.add_car').click(function (e) {
    let car_num = $('.goods_num').val()
    console.log(car_num);

    e.preventDefault()
    let cookie = getCookie('login')
    // console.log(cookie);
    if (!cookie) {
      
        localStorage.removeItem('web_stroge');
        let location_search = location.href
        localStorage.setItem('web_stroge', location_search);
        alert('请先登录！')
        location.href = './denglu.html'

    } else {
        // 添加購物車 首先拿到json数据 把对应的商品信息拿出来
        console.log(data);
        console.log($('.goods_num').html());
        $.ajax({
            url: '../js/addData.json',
            success: function (res) {
                // console.log(res);
                res.child_lists.forEach(item => {
                    if (item.name == data.name && item.id == data.id) {
                        console.log(cookie, item.id, item.goods_intro, item.price, item.name, item.url);
                        $.ajax({
                            url: '../PHP/addshoppsData.php',
                            data: {
                                telphone: cookie,
                                goods_id: item.id,
                                goods_name: item.goods_intro,
                                goods_price: item.price,
                                cat_id: item.name,
                                goods_url: item.url,
                                goods_num: car_num
                            },
                            success: function (res) {
                                // console.log(res);
                                location.href = './shoppcar.html'
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        })

                    }
                })
            },
            error: function (err) {
                console.log(err);
            }
        })







    }
})