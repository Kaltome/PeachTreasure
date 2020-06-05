window.onload = function () {
    getCartList();
    checkLogin();
}

function getCartList() {
    ajaxWithAuthentication({
        method: "GET",
        url: "Order/GetCartList",
        onload: function (xhr) {
            setCartList(xhr.response);
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}

function setCartList(responseJson) {
    let response = JSON.parse(responseJson);
    if (response.success == true) {
        document.getElementById("totalPrice").innerHTML = "Total: $" + response.totalPrice;
        let cartListBox = document.getElementById("cartListBox");
        let i = 0;
        for (let item of response.list) {
            var cartItemBox = document.createElement("div");
            cartItemBox.className = "cartItemBox";
            cartItemBox.style.top = i * 12 + "rem";
            cartItemBox.onclick = function () {
                readDetail(item.productId);
            };
            cartListBox.appendChild(cartItemBox);

            var img = document.createElement("img");
            img.src = item.productImg;
            img.className = "cartItemImg";
            cartItemBox.appendChild(img);

            var cartItemName = document.createElement("span");
            cartItemName.innerHTML = item.productName;
            cartItemName.className = "cartItemName";
            cartItemBox.appendChild(cartItemName);

            var cartItemPrice = document.createElement("span");
            if (item.productNum != 1) cartItemPrice.innerHTML = item.productPrice + " x " + item.productNum;
            else cartItemPrice.innerHTML = item.productPrice;
            cartItemPrice.className = "cartItemPrice";
            cartItemBox.appendChild(cartItemPrice);

            i++;
        }
    }
    else alert(response.message);
}

function readDetail(id) {
    window.location.href = "ProductDetail.html?id=" + id;
}

function buyAll() {
    ajaxWithAuthentication({
        method: "GET",
        url: "Order/BuyAll",
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
