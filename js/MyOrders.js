window.onload = function () {
    checkLogin();
    getOrderList();
}

function getOrderList() {
    ajaxWithAuthentication({
        method: "GET",
        url: "Order/GetOrderList",
        onload: function (xhr) {
            setOrderList(xhr.response);
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}

function setOrderList(responseJson) {
    let response = JSON.parse(responseJson);
    if (response.success == true) {
        let orderListBox = document.getElementById("orderListBox");
        let i = 0;
        for (let item of response.list) {
            var orderItemBox = document.createElement("div");
            orderItemBox.className = "orderItemBox";
            orderItemBox.style.top = i * 12 + "rem";
            orderItemBox.onclick = function () {
                readDetail(item.productId);
            };
            orderListBox.appendChild(orderItemBox);

            var img = document.createElement("img");
            img.src = item.productImg;
            img.className = "orderItemImg";
            orderItemBox.appendChild(img);

            var orderItemName = document.createElement("span");
            orderItemName.innerHTML = item.productName;
            orderItemName.className = "orderItemName";
            orderItemBox.appendChild(orderItemName);

            var orderItemPrice = document.createElement("span");
            if (item.productNum != 1) orderItemPrice.innerHTML = item.productPrice + " x " + item.productNum;
            else orderItemPrice.innerHTML = item.productPrice;
            orderItemPrice.className = "orderItemPrice";
            orderItemBox.appendChild(orderItemPrice);

            i++;
        }
    }
    else alert(response.message);
}

function readDetail(id) {
    window.location.href = "ProductDetail.html?id=" + id;
}
