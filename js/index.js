const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const productCategoryInput = document.getElementById("productCategoryInput");
const productDescInput = document.getElementById("productDescInput");
const searchInput = document.getElementById("searchInput");
const add = document.getElementById("add");
const updata = document.getElementById("updata");

var productsList = [];

//-------------------------Local Storage--------------------------------
if (localStorage.getItem("our product") == null) {
  productsList = [];
} else {
  productsList = JSON.parse(localStorage.getItem("our product"));
  displayProduct();
}

//-------------------------Add Product--------------------------------
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

//-------------------------display Product--------------------------------
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

//-------------------------Clear Input after add product-------------------
function clearProduct() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

//-------------------------Delete Product--------------------------------
function deleteProduct(i) {
  productsList.splice(i,1)
  localStorage.setItem("our product", JSON.stringify(productsList));
  displayProduct();
}

//-------------------------Up Product Info For update--------------------
function updatetable(i) {
  productNameInput.value = productsList[i].name
  productPriceInput.value = productsList[i].price
  productCategoryInput.value = productsList[i].category
  productDescInput.value = productsList[i].desc
  add.classList.add("d-none")
  updata.classList.remove("d-none")
  updata.setAttribute("onclick",`upadate(${i})`)
}

//-------------------------Update Product--------------------------------
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

//-------------------------Search Product--------------------------------
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
