var itemList = [
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
        a.parentElement.parentElement.nextElementSibling.disabled = false;
    } else {
        a.parentElement.parentElement.nextElementSibling.disabled = true;
    }
}
function dangky(forms) {
    sessionStorage.removeItem('accountdk');
    var name = forms.fullname.value;
    var gender = forms.gender.value;
    var email = forms.email.value;
    var pass = forms.password.value;
    if (checkname(forms.fullname, 'Vui lòng nhập họ tên!') && checkname(forms.gender, 'Vui lòng chọn giới tính!') && checkname(forms.email, 'Vui lòng nhập email!') && checkpswd(forms.password)) {


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
function dangnhap(forms) {
    var email = forms.username.value;
    var pass = forms.password.value;
    sessionStorage.removeItem('account');

    if (checkname(forms.username, 'Vui lòng nhập email!') && checkpswd(forms.password)) {
        // var length = localStorage.length / 5 ;
        // var check = false;
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i].email == email) {
                if (itemList[i].pass == pass) {
                    sessionStorage.setItem('account', JSON.stringify(itemList[i]));
                    return true
                }
            }
        }
        if (sessionStorage.accountdk !== undefined) {
            if (JSON.parse(sessionStorage.accountdk).email == email) {
                if (JSON.parse(sessionStorage.accountdk).pass == pass) {
                    sessionStorage.setItem('account', JSON.stringify(JSON.parse(sessionStorage.accountdk)));
                    // check = true;
                    return true;
                }
            }
        }

    }
    alert("Email hoặc mật khẩu không đúng");

    return false;
}
window.onload = function () {
    // document.write(JSON.parse(sessionStorage.account).name);
}