function ajax(request) {
    let formData = new FormData();
    for (let key in request.data) {
        formData.append(key, request.data[key]);
    }

    let xhr = new XMLHttpRequest();
    xhr.open(request.method, request.url);
    xhr.send(formData);

    xhr.onload = function () {
        if (xhr.status == 200) {
            request.onload(xhr);
        }
        else request.onfailure(xhr);
    }

    xhr.onerror = function () {
        request.onerror(xhr)
    }
}


function ajaxWithAuthentication(request) {
    let checkLogin = new XMLHttpRequest();
    checkLogin.open("GET", "Home/isLogin");
    checkLogin.send();

    checkLogin.onload = function () {
        if (checkLogin.status == 200) {
            if (checkLogin.response == "true") {
                ajax(request);
            }
            else window.location.href = "Login.html"
        }
        else request.onfailure();
    }
    checkLogin.onerror = function () {
        request.onerror(checkLogin)
    }
}

function checkLogin() {
    ajax({
        method: "GET",
        url: "Home/isLogin",
        onload: function (xhr) {
            if (xhr.status == 200 && xhr.response == "true")
                document.getElementById("loginSignUp").innerHTML = "SignOut";
        }
    });
}

function toLogin() {
    ajax({
        method: "GET",
        url: "Home/LoginOrSignOut",
        onload: function (xhr) {
            window.location.href = "Login.html";
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}


function getDataFromUrl() {
    let url = location.search; 
    let data = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            data[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return data;
}