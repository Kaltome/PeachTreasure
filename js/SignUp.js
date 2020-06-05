window.onload = function () {
    checkLogin();
}

function signUp() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (!(username && password && confirmPassword)){
        alert("Information is incomplete");
        return;
    }
    if (password != confirmPassword) {
        alert("Confirm password is incorrect");
        return;
    }

    ajax({
        method: "POST",
        url: "Home/SignUp",
        data: {
            username: username,
            password: password,
            confirmPassword: confirmPassword
        },
        onload: function (xhr) {
            checkSignUp(xhr.response);
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}

function checkSignUp(responseJson) {
    let response = JSON.parse(responseJson);
    if (response.success == true) {
        alert("SignUp Success");
        window.location.href = "ProductList.html";
    }
    else alert("SignUp False: " + response.message);
}

function toLogin() {
    window.location.href = "Login.html";
}