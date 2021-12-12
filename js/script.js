


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
        $('#carou-inner-banner').append(`<div class="carousel-item${i==0?" active":""}"><img src="${bannerList[i].image}" class="d-block w-100 img-banner"></div>`);
        $('#btn-carou-banner').append(`<button  type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ${i == 0 ? " class=\"active\"" : ""}" aria-current="true" aria-label="Slide ${i+1}"></button>`)
    }
    
}

showBanner();

$('body').css("max-width", $(window).width() + "px");
$('.banner-section .banner-image .img-carou').css("width", $(window).width() - 300 + "px");
$('#carou-inner-banner img.img-banner').css("height", ($(window).width() - 300) / 3 + "px");




// ----------------------------

$('#customers-testimonials').owlCarousel({
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: false,
    autoplayTimeout: 4000,
    smartSpeed: 300,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1170: {
            items: 3
        }
    }
});

setTimeout(function () { $('body').addClass('loaded'); }, 1500);
