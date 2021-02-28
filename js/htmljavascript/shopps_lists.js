let link_ = location.search
link_ = link_.slice(1, )
let arr_link = link_.split('=')
let name_ = arr_link[1]

console.log(link_);

$.ajax({
    url: '../js/goos_list.json',
    success: function (res) {
        console.log(res);
        res.forEach(item => {
            if (item.name == name_) {
                item.content_name.forEach((item_, index) => {

                    var html_content = ''
                    html_content = `
                    <div class="content" idx="${index+1}">
                    <strong>${item_.name_}</strong>
    
                </div>
                    `
                    $('.list_msg').append(html_content)
                })
                for (let j = 0; j < item.content_length; j++) {
                    $('.content').each((index, item1) => {
                        if (index == j) {
                            let list_1 = item.content_name[j].name_kind
                            var ul = `<ul><li><a href="" class="bgd_act">全部</a></li>`
                            list_1.forEach(item_ => {
                                // console.log(item_);
                                ul += `
                                    <li class="act_"><a href="">${item_.kinds_}</a></li>
                                 `
                            })
                            $(item1).append(ul)

                        }

                    })
                }


                $('#banner img').attr("src", item.big_banner)

                // 求出销量最高的商品 再渲染(按照销售最高的渲染)
                let arr = []
                item.child_lists.forEach(item_Num => {
                    let saleNum = Number(item_Num.sale)
                    arr.push(saleNum)
                })
                arr.sort(function (a, b) {
                    return b - a
                })

                arr = Array.from(new Set(arr))
                // console.log(item);


                // 封装销售变化函数
                function sale_change(){
                    var html = ''
                    arr.forEach(arr_item => {
                        item.child_lists.forEach(item_list => {
                            if (arr_item == item_list.sale) {
                                // console.log(arr_item,item_list.sale);
                                html += `<li>
                                        <a href="./goods_msg.html?name=${item.name}&id=${item_list.id}"><img src="${item_list.url}" alt=""></a>
                                        <strong>${item_list.goods_intro}</strong>
                                        <p class="msg"></p>
                                        <p class="price">${item_list.price}元</p>
                                        <div>
                                            <a href="./goods_msg.html?name=${item.name}&id=${item_list.id}" class="buy">立即购买</a>
                                        </div>
                                    </li>`
                            }
                        })
                    })
                    $('.goods_list').html(html)

                }
                sale_change()

                // 点击价格按钮则会相反数据渲染

                $('.sort_list p a').click(function (e) {
                    e.preventDefault()
                })

                var flag_price = true
                // 价格按钮点击
                $('.priceNum').click(function () {
                    $('.saleNum').css('color','#333')
                    // 封装价格变化函数
                    var data = []
                    function price_change() {
                        var html_price = ''
                        data.forEach(data_item => {
                            item.child_lists.forEach(item_list => {
                                if (data_item == item_list.price) {
                                    // console.log(arr_item,item_list.sale);
                                    html_price += `<li>
                                        <a href="./goods_msg.html?name=${item.name}&id=${item_list.id}"><img src="${item_list.url}" alt=""></a>
                                        <strong>${item_list.goods_intro}</strong>
                                        <p class="msg"></p>
                                        <p class="price">${item_list.price}元</p>
                                        <div>
                                            <a href="" class="buy">立即购买</a>
                                        </div>
                                    </li>`
                                }
                            })
                        })
                        $('.goods_list').html(html_price)
                    }
                    $('.price').each((index, item) => {
                        data.push(parseInt($(item).html()))
                    })
                    data.sort(function (a, b) {
                        return a - b
                    })
                    data = Array.from(new Set(data))
                    // 价格上升排序
                    if (flag_price) {
                        console.log(data);
                        $('.priceNum').html('价格 ↑').css('color', 'red')
                        price_change()
                        flag_price = false
                    } else {
                        data.reverse()
                        console.log(data);
                        $('.priceNum').html('价格 ↓').css('color', 'red')
                        flag_price = true
                        price_change()
                    }
                })

                // 点击销售按钮数据相反
                var flag_sale = true
                $('.saleNum').click(function () {
                    $('.priceNum').css('color','#333')
                    arr.reverse()
                    sale_change()
                    if (flag_sale) {
                        $('.saleNum').html('销量 ↓').css('color', 'red')
                        flag_sale = false
                    }else{
                        $('.saleNum').html('销量 ↑').css('color', 'red')
                        flag_sale = true
                    }
                })



            

            }

            $('.act_ a').hover(
                function () {
                    $(this).parents('.act_').css('background-color', 'red')
                    $(this).css('color', 'white')
                },
                function () {
                    $(this).parents('.act_').css('background-color', 'white')
                    $(this).css('color', '#666')
                }
            )
        });


        // 点击价格 排序


    },
    error: function (err) {
        console.log(err);
    }
}, 'json')





// 用户登录

//点击登录记录下网站
localStorage.removeItem('web_stroge');
let location_search = location.href
$('.register_').click(function(e){   
    localStorage.setItem('web_stroge',location_search);
    
    
})

// 获取页面的cookie

let cookie = getCookie('login');
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
    
    $('.exit_box button').click(function () {
        
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