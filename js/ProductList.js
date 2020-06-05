window.onload = function () {
    getProductList();
    checkLogin();
}

function getProductList() {
    ajax({
        method: "GET",
        url: "Product/GetProductList",
        onload: function (xhr) {
            setProductList(xhr.response);
        },
        onfailure: function (xhr) {
            alert('Error: ' + xhr.status);
        },
        onerror: function (xhr) {
            alert("Network Error");
        }
    });
}

function setProductList(responseJson) {
    let response = JSON.parse(responseJson);
    if (response.success == true) {
        let productListBox = document.getElementById("productListBox");
        let i = 0;
        for (let item of response.list) {
            var itemBox = document.createElement("div");
            itemBox.className = "itemBox";
            itemBox.style.top = Math.floor(i / 4) * 48 + "rem";
            itemBox.style.left = (i % 4) * 32 + "rem";
            itemBox.onclick = function () {
                readDetail(item.productId);
            };
            productListBox.appendChild(itemBox);

            var img = document.createElement("img");
            img.src = item.productImg;
            img.className = "itemImage";
            itemBox.appendChild(img);

            var itemMessageBox = document.createElement("div");
            itemMessageBox.className = "itemMessageBox";
            itemBox.appendChild(itemMessageBox);

            var itemName = document.createElement("span");
            itemName.innerHTML = item.productName;
            itemName.className = "itemName";
            itemMessageBox.appendChild(itemName);

            var itemPrice = document.createElement("span");
            itemPrice.innerHTML = item.productPrice;
            itemPrice.className = "itemPrice";
            itemMessageBox.appendChild(itemPrice);

            i++;
        }
        productListBox.style.height = Math.ceil(i / 4) * 48 + "rem";
    }
    else alert(response.message);
}

function readDetail(id) {
    window.location.href = "ProductDetail.html?id=" + id;
}