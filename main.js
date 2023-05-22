
// Load existing products from storage and display on the page every time the page is refreshed:
loadProductsFromStorage()

// Function that adds the user's product choice to local storage as an array of objects:
function addProduct() {

    // Take HTML elements:
    const productNameBox = document.getElementById("productNameBox");
    const priceBox = document.getElementById("priceBox");
    const categoriesBox = document.getElementById("categoriesBox");
    const imageLinkBox = document.getElementById("imageLinkBox");

    // Take there values:
    const productName = productNameBox.value;
    const price = priceBox.value;
    const categories = categoriesBox.value;
    const imageLink = imageLinkBox.value;

    // Validate all user inputs:
    if (productNameBox.value === "") {
        alert("Please enter the product's name");
        productNameBox.focus();
        return;
    }
    if (priceBox.value === "" || priceBox.value <= 0 || priceBox.value > 1000) {
        alert("Please enter a legal price between 1 to 1000");
        productNameBox.focus();
        return;
    }
    if (categoriesBox.value === "") {
        alert("Please choose a category");
        productNameBox.focus();
        return;
    }

    const urlPattern = new RegExp('(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?');
    if (imageLinkBox.value === urlPattern) {
        alert("Please type a legal link");
        productNameBox.focus();
        return;
    }

    // Create an object for etch product entered by the user:
    const products = { productName, price, categories, imageLink };

    // Get existing array from storage:
    let json = localStorage.getItem("fullProductData");
    let fullProductData = json ? JSON.parse(json) : [];

    // Add new object to the array:
    fullProductData.push(products);

    // Save new object to local storage:
    json = JSON.stringify(fullProductData);
    localStorage.setItem("fullProductData", json);

    // Show all product:
    loadProductsFromStorage();

    // Clear all boxes (after etch product the user adds):
    productNameBox.value = "";
    priceBox.value = "";
    categoriesBox.value = "";
    imageLinkBox.value = "";

}

function loadProductsFromStorage() {
    // Take HTML element to hold the table (div):
    const productTable = document.getElementById("productTable");

    // Get product data from storage:
    let json = localStorage.getItem("fullProductData");
    let fullProductData = JSON.parse(json);

    // Check if data exist (if false, don't create a table):
    if (!fullProductData) {
        return;
    }

    // Display all data in HTML table:
    let htmlTable = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Category</th>
          <th scope="col">Image Link</th>
        </tr>
      </thead>
      <tbody>
  `;

    for (const item of fullProductData) {
        htmlTable += `
      <tr>
        <th scope="row">${item.productName}</th>
        <td>${item.price}</td>
        <td>${item.categories}</td>
        <td>
          <a>
            <img src="${item.imageLink}" alt="Product Image" style="max-width: 100px;">
          </a>
        </td>
      </tr>
    `;
    }

    htmlTable += `
      </tbody>
    </table>
  `;

    productTable.innerHTML = htmlTable;
}