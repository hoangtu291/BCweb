


var scrollWindow = function () {
    $(window).scroll(function () {
        var $w = $(this),
            st = $w.scrollTop(),
            navbar = $('.my_navbar'),
            sd = $('.js-scroll-wrap');

        if (st > 150) {
            if (!navbar.hasClass('scrolled')) {
                navbar.addClass('scrolled');
            }
        }
        if (st < 150) {
            if (navbar.hasClass('scrolled')) {
                navbar.removeClass('scrolled sleep');
            }
        }
        if (st > 200) {
            if (!navbar.hasClass('awake')) {
                navbar.addClass('awake');
            }

            if (sd.length > 0) {
                sd.addClass('sleep');
            }
        }
        if (st < 200) {
            if (navbar.hasClass('awake')) {
                navbar.removeClass('awake');
                navbar.addClass('sleep');
            }
            if (sd.length > 0) {
                sd.removeClass('sleep');
            }
        }
    });
};
scrollWindow();


function showBanner() {
    for (let i = 0; i < bannerList.length; i++) {
        $('#carou-inner-banner').append(`<div class="carousel-item${i == 0 ? " active" : ""}"><img src="${bannerList[i].image}" class="d-block w-100 img-banner"></div>`);
        $('#btn-carou-banner').append(`<button  type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="btn-circle ${i == 0 ? " active" : ""}" aria-current="true" aria-label="Slide ${i + 1}"></button>`)
    }

}

showBanner();


// SET BANNER SIZE
// function setBannerSize() {
//     var screenWidth = $(window).width();
//     if (screenWidth>1519){
//         screenWidth = 1519;
//     }
//     $('body').css("max-width", screenWidth + "px");
//     $('.banner-section .banner-image .img-carou').css("width", screenWidth - 300 + "px");
//     $('#carou-inner-banner img.img-banner').css("height", (screenWidth - 300) / 3 + "px");   
// }

// setBannerSize();



// ----------------------------

$('#customers-testimonials').owlCarousel({
    loop: true,
    center: false,
    items: 6,
    margin: 5,
    autoplay: true,
    dots: false,
    autoplayTimeout: 4000,
    smartSpeed: 300,
    responsive: {
        0: {
            items: 1
        },
        460: {
            items: 2
        },
        670: {
            items: 3
        },
        880: {
            items: 4
        },
        1250: {
            items: 5
        },
        1500: {
            items: 6
        }
    }
});


// ANIMATE

var contentWayPoint = function () {
    var i = 0;
    $('.ftco-animate').waypoint(function (direction) {

        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
            i++;
            $(this.element).addClass('item-animate');
            setTimeout(function () {

                $('body .ftco-animate.item-animate').each(function (k) {
                    var el = $(this);
                    setTimeout(function () {
                        el.addClass('ftco-animated');
                        el.removeClass('item-animate');
                    }, k * 50, 'easeInOutExpo');
                });

            }, 100);

        }

    }, { offset: '95%' });
};
contentWayPoint();

// SHOW ICON SAVE

$('.post-item').mouseenter(function () {
    $(this).children('.item-post-footer').addClass('icon-save-show');
});
$('.post-item').mouseleave(function () {
    $(this).children('.item-post-footer').removeClass('icon-save-show');
});

function eventFunc() {
    $('.post-item').click(redirectDetails());
}

$('.post-item, #customers-testimonials .post-item-hot .footer-post .btn-seeDetail').click(function redirectDetails() {
    window.location.href = "details.html";
});

// LOADED
setTimeout(function () { $('body').addClass('loaded'); }, 300);