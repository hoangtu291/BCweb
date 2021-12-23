
// danh sách tài khoản đăng nhập
var accountList = [
    {
        name: "Nguyễn Văn A",
        gender: "Nam",
        email: "A@gmail.com",
        pass: "12345678a",
    },
    {
        name: "Nguyễn Văn D",
        gender: "Nam",
        email: "D@gmail.com",
        pass: "12345678d",
    },
    {
        name: "Nguyễn Thị A",
        gender: "Nữ",
        email: "A1@gmail.com",
        pass: "12345678a1",
    },
    {
        name: "Nguyễn Văn B",
        gender: "Khác",
        email: "B@gmail.com",
        pass: "12345678b",
    },
    {
        name: "Nguyễn Văn C",
        gender: "Nam",
        email: "C@gmail.com",
        pass: "12345678c"
    }
]

//kiểm tra thông tin đăng nhập hoặc đăng ký và hiển thị thông báo
function checkname(a, x) {
    if (a.value == "") {
        a.nextElementSibling.innerText = x;
        return false;
    } else {
        a.nextElementSibling.innerText = "";
        return true;
    }
}
function checkpswd(a) {
    if (a.value == "") {
        a.nextElementSibling.innerText = "Vui lòng nhập mật khẩu!";
        return false;
    } else
        if (a.value.length < 6) {
            a.nextElementSibling.innerText = "Mật khẩu phải có độ dài lớn hơn 6!";
            return false;
        } else {
            a.nextElementSibling.innerText = "";
            return true;
        }
}
function checkedbox(a) {
    if (a.checked) {
        return true
    } 
    a.parentElement.nextElementSibling.innerText = "Bạn cần chấp nhận điều khoản sử dụng của chúng tôi";
    return false;
}

//kiểm tra thông tin đăng ký và lưu vào sessionStorage
function dangky(forms) {
    sessionStorage.removeItem('accountdk');
    var name = forms.fullname.value;
    var gender = forms.gender.value;
    var email = forms.email.value;
    var pass = forms.password.value;
    if (checkname(forms.fullname, 'Vui lòng nhập họ tên!') && checkname(forms.gender, 'Vui lòng chọn giới tính!') && checkname(forms.email, 'Vui lòng nhập email!') && checkpswd(forms.password) && checkedbox(forms.terms_of_use)) {
        var account = {
            name: name,
            gender: gender,
            email: email,
            pass: pass
        }

        sessionStorage.setItem('accountdk', JSON.stringify(account));
        sessionStorage.setItem('account', JSON.stringify(account));
        return true;
    }
    return false;
}

//kiểm tra thông tin đăng nhập và lưu vào sessionStorage
function dangnhap(forms) {
    var email = forms.username.value;
    var pass = forms.password.value;
    sessionStorage.removeItem('account');

    if (checkname(forms.username, 'Vui lòng nhập email!') && checkpswd(forms.password)) {
        for (var i = 0; i < accountList.length; i++) {
            if (accountList[i].email == email) {
                if (accountList[i].pass == pass) {
                    sessionStorage.setItem('account', JSON.stringify(accountList[i]));
                    return true
                }
            }
        }
        if (sessionStorage.accountdk !== undefined) {
            if (JSON.parse(sessionStorage.accountdk).email == email) {
                if (JSON.parse(sessionStorage.accountdk).pass == pass) {
                    sessionStorage.setItem('account', JSON.stringify(JSON.parse(sessionStorage.accountdk)));
                    return true;
                }
            }
        }

    }
    alert("Email hoặc mật khẩu không đúng");
    return false;
}