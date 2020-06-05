window.onload = function () {
    checkLogin();
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!(username && password)) {
        alert("Information is incomplete");
        return;
    }

    ajax({
        method: "POST",
        url: "Home/Login",
        data: {
            username: username,
            password: password
        },
        onload: function (xhr) {
            checkLogin(xhr.response);
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}

function checkLogin(responseJson) {
    let response = JSON.parse(responseJson);
    if (response.success == true) {
        window.location.href = "ProductList.html";
    }
    else alert("Login False: " + response.message);
}

function toSignUp() {
    window.location.href = "SignUp.html";
}