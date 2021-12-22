//navbar ẩn hiện
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

function showAccountNav() {
    if (sessionStorage.account !== undefined) {
        $('#btn-signin').addClass('d-none');
        $('#nav-account').removeClass('d-none');

        // gán dữ liệu trên session
        $('#nav-account .dropbtn a').html("Xin chào,&nbsp;&nbsp;&nbsp;" + JSON.parse(sessionStorage.account).name)
    }
}
showAccountNav();

function logOut() {
    var result = confirm("Bạn chắc chắn muốn đăng xuất");
    if (result) {
        sessionStorage.removeItem('account');
        window.location.href = "index.html";
    }
}

// chuyển trang Tạo CV

function checkRedirectCV() {
    if (sessionStorage.account === undefined) {
        var result = confirm("Bạn cần đăng nhập để thực hiện chức năng tạo CV");
        if (result) {
            window.location.href = "yboxClone/dangnhap.html";
        }
    } else {
        window.location.href = "createCV.html";
    }
}

function redirectDetails(code) {
    window.location.href = "details.html?job=" + code;
}


function showBanner() {
    for (let i = 0; i < bannerList.length; i++) {
        $('#carou-inner-banner').append(`<div class="carousel-item${i == 0 ? " active" : ""}"><img src="${bannerList[i].image}" class="d-block w-100 img-banner"></div>`);
        $('#btn-carou-banner').append(`<button  type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="btn-circle ${i == 0 ? " active" : ""}" aria-current="true" aria-label="Slide ${i + 1}"></button>`);
    }

}

showBanner();

// ----------------------------

//load hot job
function loadHotJob() {
    for (let i = 0; i < Object.keys(listHotPost).length; i++) {
        var index = i + Object.keys(listJob).length + 1;
        $('#customers-testimonials').append(`<div class="post-item-hot ftco-animate">
                                    <div class="contain-item card-item">
                                        <div class="head-post">
                                            <div class="image-logo" style="background-image: url('${listHotPost["job" + index].brand}'); background-size: contain;"></div>
                                        </div>
                                        <p class="vacancies">${listHotPost["job" + index].nghenghiep}</p>
                                        <span class="detail-vac">${listHotPost["job" + index].title}</span>
                                        <div class="end-date"><span class="txtEnd-date">${listHotPost["job" + index].hanchot}</span></div>
                                        <div class="info-post">
                                            <p><span class="icon-post icon-money"></span>${listHotPost["job" + index].luong}</p>
                                            <p><span class="icon-post icon-exp"></span>${listHotPost["job" + index].kinhnghiem}</p>
                                            <p><span class="icon-post icon-locate"></span>${listHotPost["job" + index].diachi}</p>
                                            <p><span class="icon-post icon-time"></span>${listHotPost["job" + index].tinhchatcongviec}</p>
                                        </div>

                                        <div class="footer-post">
                                            <button class="btn-save btn-circle" data-bs-toggle="tooltip"
                                                title="Lưu bài viết" onclick="savePost('${"job" + index}')"></button>
                                            <a href="javascript:redirectDetails('${"job" + index}')"><button class="btn-seeDetail btn-radCircle btn-blue">Detail</button></a>
                                        </div>
                                    </div>
                                </div>`);
    }
}

loadHotJob();


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
            items: 1.5
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

//load job
window.addEventListener('scroll', () => {
    setTimeout(function () {
        if (window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight) {
            loadJob('listpost');
            contentWayPoint();
        }
    }, 2000);
});

function loadJob(id) {
    for (let i = 0; i < Object.keys(listJob).length; i++) {
        var index = (i + 1) < 10 ? "0" + (i + 1) : i + 1;

        $('#' + id + ' .container-list-post .row').append(`<div class="col-md-6 col-lg-3 col-sm-12 ftco-animate">
            <div class="post-item card-item" id="${"job" + index}">
                <div class="item-post-header">
                    <div class="avatar-user btn-circle"></div>
                    <span class="name-user">${listJob["job" + index].hotennguoidang}&nbsp;</span>
                    <span class="time-post">&#8226;&nbsp;43 phút</span>
                </div>
                <div class="item-post-main">
                    <span class="title-post-card">${listJob["job" + index].title}</span>
                    <div class="end-date"><span class="txtEnd-date">${listJob["job" + index].hanchot}</span></div>
                    <div class="image-post-card"><img src="${listJob["job" + index].logo}" alt="Ảnh bài viết"
                            height="100%"></div>
                </div>
                <div class="item-post-footer">
                    <div class="around-btnsave-post btn-radCircle" data-bs-toggle="tooltip"
                        title="Lưu bài viết" onclick="savePost('${"job" + index}')">
                        <div class="btn-save-card btn-save btn-circle"></div>
                    </div>
                </div>
            </div>
        </div>`);
    }

    // hiển thị nút lưu bài viết

    $('.post-item').mouseenter(function () {
        $(this).children('.item-post-footer').addClass('icon-save-show');

        $('.navbar-brand span').addClass('d-none');

        $('.navbar-brand .move-brand').addClass('move-re');
    });
    $('.post-item').mouseleave(function () {
        $(this).children('.item-post-footer').removeClass('icon-save-show');

        $('.navbar-brand span').removeClass('d-none');
        $('.navbar-brand .move-brand').removeClass('move-re');
    });

    //chuyển đến trang chi tiết
    $('.post-item .item-post-header, .post-item .item-post-main, #customers-testimonials .post-item-hot .footer-post .btn-seeDetail').click(function () {
        window.location.href = `details.html?job=${this.parentElement.id}`;
    });

}

loadJob('listpost-section');
loadJob('listpost');

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

// hiện icon lưu bài viết
$('.post-item').mouseenter(function showSave() {
    $(this).children('.item-post-footer').addClass('icon-save-show');

    $('.navbar-brand span').addClass('d-none');

    $('.navbar-brand .move-brand').addClass('move-re');
});
$('.post-item').mouseleave(function hiddenSave() {
    $(this).children('.item-post-footer').removeClass('icon-save-show');

    $('.navbar-brand span').removeClass('d-none');
    $('.navbar-brand .move-brand').removeClass('move-re');
});


// chuyển đến trang chi tiết
$('.post-item .item-post-header, .post-item .item-post-main, #customers-testimonials .post-item-hot .footer-post .btn-seeDetail').click(function () {
    window.location.href = `details.html?job=${this.parentElement.id}`;
});

// chuyển đến trang đăng nhập
$('#btn-signin').click(function () {
    window.location.href = "yboxClone/dangnhap.html";
});

// chuyển đến trang xem bài viết đã lưu
$('#badge-listSave').click(function () {
    window.location.href = "save.html";
})


function hiddenModal(id) {
    $('#' + id).modal('hide');
}

function showProfile() {
    if (sessionStorage.account !== undefined) {
        var profileName = JSON.parse(sessionStorage.account).name;
        var sex = JSON.parse(sessionStorage.account).gender;
        var profileEmail = JSON.parse(sessionStorage.account).email;

        $('#profile-name').html(`${profileName}${sex == "Nam" ? `<i class="fas fa-mars ms-3"style="color: #4e88c5;"></i>` : `<i class="fas fa-venus ms-3" style="color: #f78888;"></i>`}`);
        $('#profile-birth').html(`<i class="fas fa-birthday-cake icon-yellow"></i>`);
        $('#profile-email').html(`<td><i class="fas fa-envelope icon-yellow"></i></td>
                                    <td>
                                        <p>${profileEmail}</p>
                                    </td>`);
        $('#profile-phone').html(`<td><i class="fas fa-phone icon-yellow"></i></td>
                                    <td>
                                        <p></p>
                                    </td>`);
        $('#profile-address').html(`<td><i class="fas fa-map-marker-alt icon-yellow"></i></i></td>
                                    <td>
                                        <p></p>
                                    </td>`);

    }
}


function saveProfile() {

    var profileName = $('#name').val();
    var sex = $('input[name=\'sex\']:checked').val();
    var profileBirth = $('#birth').val();
    var profileDetail = $('#comment').val();
    var profileEmail = $('#email').val();
    var profilePhone = $('#phone').val();
    var profileAddress = $('#address').val();

    $('#profile-name').html(`${profileName}${sex == "Nam" ? `<i class="fas fa-mars ms-3"style="color: #4e88c5;"></i>` : `<i class="fas fa-venus ms-3" style="color: #f78888;"></i>`}`);
    $('#profile-birth').html(`<i class="fas fa-birthday-cake icon-yellow"></i>${profileBirth}`);
    $('#profile-detail').html(profileDetail);
    $('#profile-email').html(`<td><i class="fas fa-envelope icon-yellow"></i></td>
                                    <td>
                                        <p>${profileEmail}</p>
                                    </td>`);
    $('#profile-phone').html(`<td><i class="fas fa-phone icon-yellow"></i></td>
                                    <td>
                                        <p>${profilePhone}</p>
                                    </td>`);
    $('#profile-address').html(`<td><i class="fas fa-map-marker-alt icon-yellow"></i></i></td>
                                    <td>
                                        <p>${profileAddress}</p>
                                    </td>`);

    hiddenModal('profileModal');
}

function saveEdu() {
    $('#edu-section').removeClass('d-none');

    var eduName = $('#schoolName').val();
    var eduAddress = $('#schoolAdd').val();
    var eduTime = $('#startSchool').val() + " - " + $('#endSchool').val();
    var eduGPA = $('#gpa').val();
    var eduTtich = $('#ttichEdu').val();

    $('#edu-section').append(`<div class="info-element">
                            <div class="profile-edit"><i class="fas fa-trash-alt icon-red" onclick="removeInfoElement(this)"></i></div>
                            <h5>${eduName}</h5>
                            <p class="address-date">${eduAddress} • ${eduTime}</p>
                            <p>GPA: ${eduGPA}</p>
                            <i>Thành tích: ${eduTtich}</i>
                        </div>`);

    hiddenModal('eduModal');
}

function saveWork() {
    $('#work-section').removeClass('d-none');

    var workPosi = $('#workPosition').val();
    var companyName = $('#company').val();
    var workAddress = $('#workAdd').val();
    var workTime = $('#startWork').val() + " - " + $('#endWork').val();
    var workTtich = $('#ttichWork').val();

    $('#work-section').append(`<div class="info-element">
                            <div class="profile-edit"><i class="fas fa-trash-alt icon-red" onclick="removeInfoElement(this)"></i></div>
                            <h5>${workPosi} @ ${companyName}</h5>
                            <p class="address-date">${workAddress} •  ${workTime}</p>
                            <p>Thành tích: ${workTtich}</p>
                        </div>`)

    hiddenModal('workModal');
}

function saveVolun() {
    $('#volun-section').removeClass('d-none');

    var volunPosi = $('#volunPosition').val();
    var eventName = $('#volunEvent').val();
    var volunAddress = $('#volunAdd').val();
    var volunTime = $('#startVolun').val() + " - " + $('#endVolun').val();
    var workTtich = $('#ttichVolun').val();

    $('#volun-section').append(`<div class="info-element">
                            <div class="profile-edit"><i class="fas fa-trash-alt icon-red" onclick="removeInfoElement(this)"></i></div>
                            <h5>${volunPosi} @ ${eventName}</h5>
                            <p class="address-date">${volunAddress} • ${volunTime}</p>
                            <p>Thành tích: ${workTtich}</p>
                        </div>`)

    hiddenModal('volunModal');
}

function saveSkill() {
    $('#skill-section').removeClass('d-none');

    var skillName = $('#skillName').val();
    var level = $('#levelSkill').val();
    var star = "";

    for (let i = 0; i < 5; i++) {
        if (i < level) {
            star += `<i class="fas fa-star"></i>`;
        }
        else {
            star += `<i class="far fa-star"></i>`;
        }
    }

    $('#skill-section').append(`<div class="info-element">
                            <div class="profile-edit"><i class="fas fa-trash-alt icon-red" onclick="removeInfoElement(this)"></i></div>
                            <h5>${skillName}</h5>
                            <p class="text-warning">
                                ${star}
                            </p>
                        </div>`);

    hiddenModal('skillModal');
}

function saveHobby() {
    $('#hobby-section').removeClass('d-none');

    var hobbyName = $('#hobbyName').val();

    $('#hobby-section').append(`<div class="info-element">
                            <div class="profile-edit"><i class="fas fa-trash-alt icon-red" onclick="removeInfoElement(this)"></i></div>
                            <h5>${hobbyName}</h5>
                        </div>`)

    hiddenModal('hobbyModal');
}

function removeInfoElement(element) {
    var idElement = $(element).parents('.section-cv').attr('id');
    // alert(idElement);
    $(element).parents('.info-element').remove();


    $(idElement).children().length
    if ($("#" + idElement).children('.info-element').length == 0) {
        $("#" + idElement).addClass('d-none');
    }
}


// LƯU BÀI VIẾT
function savePost(code) {
    var message = "Lưu bài viết thành công";
    var alert = "alert-success"
    if (localStorage[code] !== undefined) {
        message = "Lưu bài viết thất bại do bài viết đã được lưu trước đó";
        alert = "alert-danger"
    }

    if (listJob[code] !== undefined) {
        localStorage.setItem(code, JSON.stringify(listJob[code]));
    }
    else {
        localStorage.setItem(code, JSON.stringify(listHotPost[code]));
    }

    $('#alert').addClass(alert).removeClass('d-none');

    $('#alert').html(message);

    setTimeout(() => {
        $('#alert').addClass('hide-alert').removeClass(alert);

        setTimeout(() => {
            $('#alert').addClass('d-none').removeClass('hide-alert');
        }, 500);
    }, 1000);

    $('#badge-numSaved').html(localStorage.length);
}

function showListSave() {
    $('tbody#list-save').html("");

    if (localStorage.length == 0) {
        $('tbody#list-save').html(`<tr><td colspan="4" class="text-center"><b>Chưa có bài viết nào được lưu</b></td></tr>`)
    }

    for (let i = 0; i < localStorage.length; i++) {
        $('tbody#list-save').append(`<tr>
                        <td rowspan="2" style="height: 95px; width: fit-content; cursor: pointer;" onclick="redirectDetails('${localStorage.key(i)}')"><img
                                src="${JSON.parse(localStorage[localStorage.key(i)]).logo}" alt="Ảnh bài viết" height="100%"></td>
                        <td colspan="2" style="width: max-content; cursor: pointer;" onclick="redirectDetails('${localStorage.key(i)}')"><b>${JSON.parse(localStorage[localStorage.key(i)]).title}</b></td>
                        <td rowspan="2" class="text-center" style="width: 50px; height: 100%; line-height: 70px;"><i class="fas fa-trash-alt icon-red del-save" onclick="removeItemSave('${localStorage.key(i)}')"></i></td>
                    </tr>
                    <tr>
                        <td>
                            <div class="end-date"><span class="txtEnd-date">${JSON.parse(localStorage[localStorage.key(i)]).hanchot}</span></div>
                        </td>
                        <td class="text-end"><b>Lương:</b> ${JSON.parse(localStorage[localStorage.key(i)]).luong === undefined ? "Thỏa thuận" : JSON.parse(localStorage[localStorage.key(i)]).luong}</td>
                    </tr><tr><th colspan="4"></th></tr>`);
    }
    $('#badge-numSaved').html(localStorage.length);

}

$('#badge-numSaved').html(localStorage.length);

function removeItemSave(code) {
    if (localStorage[code] !== "undefined") {
        localStorage.removeItem(code);
        showListSave();
    }
}

window.onstorage = () => {
    showListSave();
};

function showDetails() {
    var code = new URLSearchParams(window.location.search).get("job");

    if (listJob[code] !== undefined){
        $('.avt-cty .name-cty').html("&nbsp;"+listJob[code].hotennguoidang);
        $('#logo-cty').attr('src', listJob[code].logo);
        $('.title-td h1').html(listJob[code].title);
        $('.main-gthieu-cty .gt-cty img').attr('src', listJob[code].logo);
        $('#hanchot').html(`<b>Hạn cuối:</b> 23:59 ngày ${listJob[code].hanchot}`);
        $('#salary').html("Thỏa thuận");
    }
    else{
        $('.avt-cty .name-cty').html("&nbsp;"+listHotPost[code].hotennguoidang);
        $('#logo-cty').attr('src', listHotPost[code].logo);
        $('.title-td h1').html(listHotPost[code].title);
        $('.main-gthieu-cty .gt-cty img').attr('src', listHotPost[code].logo);

        $('#tinhchat-cv').html(listHotPost[code].tinhchatcongviec);
        $('#kinhnghiem-cv').html(listHotPost[code].kinhnghiem);
        $('#diadiem-cv').html(listHotPost[code].diachi);
        $('#hanchot').html(`<b>Hạn cuối:</b> 23:59 ngày ${listHotPost[code].hanchot}`);
        $('#salary').html(listHotPost[code].luong);
    }
}

// LOADED
setTimeout(function () { $('body').addClass('loaded'); }, 300);