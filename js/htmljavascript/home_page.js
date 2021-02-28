let appear_list = document.querySelectorAll('.appear_list')
let nav_top_list = document.querySelector('.nav_top_list')
let hidden_list = document.querySelector('.hidden_list')


// 顶部导航栏数据
appear_list.forEach((item, index) => {
    item.onmouseover = function () {
        $('.hidden_list').css('display', 'block')

        $.ajax({
            url: '../js/top_goods_list.json',
            success: function (res) {
                var html = ''
                res[index].children.forEach(function (item) {

                    var params = 'id=' + item.id + '&name=' + item.name + '&kind=' + encodeURI(item.kind)

                    html += `
                    <li>
                    <a href="./goods_msg.html?${params}">
                        <img src="${item.url}"">
                        <p>${item.goods_intruduce}</p>
                        <span id="pirces">${item.price}元</span>
                    </a>
                </li>
                    
                `
                })
                $('.hidden_list ul').html(html)
            },
            error: function (res) {
                console.log(res);
            },
        })

       


    }

    item.onmouseout = function () {
        console.log($(item));
        let a = $(item).parents().find('.hidden_list')
        console.log(a);
        a.css('display','none')
        $('.hidden_list').mouseover(function(){
            $(this).css('display','block')
        })
        $('.hidden_list').mouseout(function(){
            $(this).css('display','none')
        })

    }

})

// 用户登录之后

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


$('.banner_nav li').mouseover(
    function () {
        let idx = $(this).index()
        $('.goods_list').css('display', 'block')
        $.ajax({
            url: '../js/banner_good_lists.json',
            success: function (res) {
                var html = ''
                res[idx].children.forEach(function (item) {

                    html += `
                    <li><a href="">
                    <img src="${item.url}" alt="">
                    <div>
                        <p>${item.goods_intruduce}
                        </p>
                        <p>${item.price}元</p>
                    </div>
                </a></li>
                    `
                })
                $('.goods_list ul').html(html)

            },
            error: function (err) {
                console.log(err);
            }
        })
    },

)

$('.banner_nav li').mouseout(
    function () {
        let goods_list = $(this).parents().find('.banner_nav').next()
        goods_list.css('display', 'none')
        goods_list.mouseover(function () {
            goods_list.css('display', 'block')
        })
        goods_list.mouseout(function () {
            goods_list.css('display', 'none')
        })

    }
)


// 侧边导航栏
$('.introduce_lists a').each((index, item) => {
    $(item).click(function (e) {
        e.preventDefault()
        let idx_li = $(item).parent().index()
        // console.log($(item).parent().index());
        if (idx_li == 0) {
            $('html').animate({
                scrollTop: 945
            }, 500)
        }
        if (idx_li == 1) {
            $('html').animate({
                scrollTop: 1680
            }, 500)
        }
        if (idx_li == 2) {
            $('html').animate({
                scrollTop: 2425
            }, 500)
        }
        if (idx_li == 3) {
            $('html').animate({
                scrollTop: 3170
            }, 500)
        }
        if (idx_li == 4) {
            $('html').animate({
                scrollTop: 3915
            }, 500)
        }
        if (idx_li == 5) {
            $('html').animate({
                scrollTop: 4655
            }, 500)
        }
    })
})
$(window).scroll(function () {

    let scrollY = $(this).scrollTop()

    if (scrollY >= 850) {
        let oy = window.innerHeight / 2 - 123;
        $('.introduce_lists').css({
            'display': 'block',
            top: oy
        })
        $('.introduce_lists a').removeClass('active')
        $($('.introduce_lists a')[0]).addClass('active')
    }
    if (scrollY <= 850 || scrollY >= 5000) {
        $('.introduce_lists').css({
            'display': 'none',
        })
    }
    if (scrollY >= 1500) {
        $('.introduce_lists a').removeClass('active')
        $($('.introduce_lists a')[1]).addClass('active')
    }
    if (scrollY >= 2300) {
        $('.introduce_lists a').removeClass('active')
        $($('.introduce_lists a')[2]).addClass('active')
    }
    if (scrollY >= 3100) {
        $('.introduce_lists a').removeClass('active')
        $($('.introduce_lists a')[3]).addClass('active')
    }
    if (scrollY >= 3800) {
        $('.introduce_lists a').removeClass('active')
        $($('.introduce_lists a')[4]).addClass('active')
    }
    if (scrollY >= 4500) {
        $('.introduce_lists a').removeClass('active')
        $($('.introduce_lists a')[5]).addClass('active')
    }


})


// 请求数据详情
$.ajax({
    url: '../js/good_kind.json',
    success: function (res) {

        // console.log($('.shopp_kinds .right ul'));
        // console.log(res);
        let idx_data = 0
        res.forEach((item, index_) => {
            // console.log(item, index_, idx_data);
            var msg = ''
            res[idx_data].children.forEach(function (item) {
                msg += `
                            <li><a href="">
                                <img src="${item.url}" alt="" class="appear">
                                <p>${item.goods_intruduce}</p>
                                <div class="price_1">${item.price}元</div>
                            </a></li>`
            })
            $('.shopp_kinds .right ul')[idx_data].innerHTML = msg
            idx_data++
        })

    },
    error: function (err) {
        console.log(err);
    }
}, 'json')

// 右边回到顶部
$('.bottom').click(function (e) {
    console.log(666);
    e.preventDefault()
    $('html').animate({
        scrollTop: 0
    }, 500)
})


//轮播图

var mySwiper = new Swiper('.swiper-container', {
    effect: 'fade',
    speed: 1000,

    autoplay: {
        delay: 1200,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // observer: true, //修改swiper自己或子元素时，自动初始化swiper 
    // observeParents: true, //修改swiper的父元素时，自动初始化swiper


})

$('.appear_list').click(function (item) {
    console.log(this);
})