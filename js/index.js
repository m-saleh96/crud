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
  displayProduct(productsList);
}

function addProduct() {
  product = {
    id: Math.floor(Math.random() * 1000),
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  productsList.push(product);
  localStorage.setItem("our product", JSON.stringify(productsList));
  displayProduct(productsList);
  clearProduct();
}

function displayProduct(array) {
  view = "";
  for (var i = 0; i < array.length; i++) {
    view += `<tr>
                    <td>${array[i].name}</td>
                    <td>${array[i].price}</td>
                    <td>${array[i].category}</td>
                    <td>${array[i].desc}</td>
                    <td><button onclick='updatetable(${i})' class="btn btn-primary">update</button></td>
                    <td><button onclick='deleteProduct(${array[i].id})' class="btn btn-danger">delete</button></td>
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

function deleteProduct(ID) {
  const Filterd = productsList.filter((product) => product.id != ID);
  localStorage.setItem("our product", JSON.stringify(Filterd));
  productsList = Filterd;
  displayProduct(productsList);
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
  displayProduct(productsList)
}

function searchProduct() {
  var term = searchInput.value;
  const Filterd = productsList.filter((product) => {
    if (product.name.toLowerCase().includes(term.toLowerCase())) {
      return product;
    }
  });
  displayProduct(Filterd);
}
