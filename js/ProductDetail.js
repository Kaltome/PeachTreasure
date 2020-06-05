let id;

window.onload = function () {
    let data = getDataFromUrl();
    id = data["id"];
    checkLogin();
    getProductDetail(id);
}

function getProductDetail(id) {
    ajax({
        method: "POST",
        url: "Product/GetProductDetail",
        data: {
            id: id
        },
        onload: function (xhr) {
            setProductDetail(xhr.response);
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}

function setProductDetail(responseJson) {
    let response = JSON.parse(responseJson);
    if (response.success == true) {
        id = response.product.productId;
        document.getElementById("productImage").src = response.product.productImg;
        document.getElementById("productName").innerHTML = response.product.productName;
        document.getElementById("price").innerHTML = response.product.productPrice;
    }
    else alert(response.message);
}

function buy() {
    ajaxWithAuthentication({
        method: "POST",
        url: "Product/Buy",
        data: {
            id: id
        },
        onload: function (xhr) {
            let response = JSON.parse(xhr.response);
            alert(response.message);
            if (response.success) window.location.href = "MyOrders.html";
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}

function addToCart() {
    ajaxWithAuthentication({
        method: "POST",
        url: "Product/AddToCart",
        data: {
            id: id
        },
        onload: function (xhr) {
            alert(xhr.response);
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}