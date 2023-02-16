var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var searchInput = document.getElementById("searchInput");
var add = document.getElementById("add");
var updata = document.getElementById("updata");

var productsList = [];

if (localStorage.getItem("our product") == null) {
  productsList = [];
} else {
  productsList = JSON.parse(localStorage.getItem("our product"));
  displayProduct();
}

function addProduct() {
  product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  productsList.push(product);
  localStorage.setItem("our product", JSON.stringify(productsList));
  displayProduct();
  clearProduct();
}

function displayProduct() {
  view = "";
  for (var i = 0; i < productsList.length; i++) {
    view += `<tr>
                    <td>${i}</td>
                    <td>${productsList[i].name}</td>
                    <td>${productsList[i].price}</td>
                    <td>${productsList[i].category}</td>
                    <td>${productsList[i].desc}</td>
                    <td><button onclick='updatetable(${i})' class="btn btn-primary">update</button></td>
                    <td><button onclick='deleteProduct(${i})' class="btn btn-danger">delete</button></td>
                </tr>
        `;
  }
  document.getElementById("tablebody").innerHTML = view;
}

function clearProduct() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

function deleteProduct(i) {
  productsList.splice(i,1)
  localStorage.setItem("our product", JSON.stringify(productsList));
  displayProduct();
}

function updatetable(i) {
  productNameInput.value = productsList[i].name
  productPriceInput.value = productsList[i].price
  productCategoryInput.value = productsList[i].category
  productDescInput.value = productsList[i].desc
  add.classList.add("d-none")
  updata.classList.remove("d-none")
  updata.setAttribute("onclick",`upadate(${i})`)
}
function upadate(i) {
  productsList[i].name = productNameInput.value
  productsList[i].price = productPriceInput.value
  productsList[i].category = productCategoryInput.value
  productsList[i].desc = productDescInput.value
  localStorage.setItem("our product" , JSON.stringify(productsList))
  updata.classList.add("d-none")
  add.classList.remove("d-none")
  displayProduct()
}

function searchProduct(value) {
  let view = ""
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].name.toLowerCase().includes(value.toLowerCase())) {
      view += `<tr>
      <td>${i}</td>
      <td>${productsList[i].name}</td>
      <td>${productsList[i].price}</td>
      <td>${productsList[i].category}</td>
      <td>${productsList[i].desc}</td>
      <td><button onclick='updatetable(${i})' class="btn btn-primary">update</button></td>
      <td><button onclick='deleteProduct(${i})' class="btn btn-danger">delete</button></td>
    </tr>
    `;
    }
    
  }
  document.getElementById("tablebody").innerHTML = view
}
