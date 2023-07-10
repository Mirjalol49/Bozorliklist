let ombor = [];

// Retrieve data from local storage
const savedOmbor = localStorage.getItem("ombor");
if (savedOmbor) {
  ombor = JSON.parse(savedOmbor);
}

const elform = document.querySelector(".form");
const elInputName = document.querySelector(".form-name");
const elInputPrice = document.querySelector(".form-price");
const elformResult = document.querySelector(".form-result");
const elTotalResult = document.querySelector(".total-result");

elform.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newProduct = [elInputName.value, elInputPrice.value];

  ombor.push(newProduct);

  elInputName.value = "";
  elInputPrice.value = "";

  saveDataToLocalStorage();
  drawPage();
  calculateTotal();
});

function drawPage() {
  let result = "";

  for (let i = 0; i < ombor.length; i++) {
    const product = ombor[i];

    result += `<li class="list-style mt-3 list-item-action d-flex justify-content-between align-items-center" data-index="${i}">
        <div>
          <p class=" h4 product-style">Mahsulot nomi: <span class="product-name">${
            product[0]
          }</span></p>
       <p class="h4 product-style">Mahsulot narxi: <span class="product-price">${product[1]
         .toString()
         .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span> so'm</p>

        </div>
        <div class="card-btn">
          <button class="btn btn-danger me-3" type="button" onclick="deleteProduct(${i})">Delete</button>
          <button class="btn btn-primary edit-btn" type="button">Edit</button>
          <button class="btn btn-success save-btn" type="button" style="display: none;">Save</button>
        </div>
      </li>`;
  }

  elformResult.innerHTML = result;

  // Add event listeners to edit buttons
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", handleEdit);
  });

  // Add event listeners to save buttons
  const saveButtons = document.querySelectorAll(".save-btn");
  saveButtons.forEach((saveButton) => {
    saveButton.addEventListener("click", handleSave);
  });
}

function deleteProduct(delitem) {
  ombor.splice(delitem, 1);
  saveDataToLocalStorage();
  drawPage();
  calculateTotal();
}

function handleEdit(event) {
  const listItem = event.target.closest("li");
  const productNameEl = listItem.querySelector(".product-name");
  const productPriceEl = listItem.querySelector(".product-price");
  const editButton = listItem.querySelector(".edit-btn");
  const saveButton = listItem.querySelector(".save-btn");

  editButton.style.display = "none";
  saveButton.style.display = "inline-block";

  const productName = productNameEl.textContent;
  const productPrice = productPriceEl.textContent;

  productNameEl.innerHTML = `<input class="form-control" type="text" value="${productName}">`;
  productPriceEl.innerHTML = `<input class="form-control" type="number" value="${productPrice}">`;
}

function handleSave(event) {
  const listItem = event.target.closest("li");
  const productNameEl = listItem.querySelector(".product-name input");
  const productPriceEl = listItem.querySelector(".product-price input");
  const editButton = listItem.querySelector(".edit-btn");
  const saveButton = listItem.querySelector(".save-btn");

  const index = parseInt(listItem.dataset.index, 10);
  const productName = productNameEl.value;
  const productPrice = productPriceEl.value;

  ombor[index][0] = productName;
  ombor[index][1] = productPrice;

  editButton.style.display = "inline-block";
  saveButton.style.display = "none";

  productNameEl.outerHTML = `<span class="product-name">${productName}</span>`;
  productPriceEl.outerHTML = `<span class="product-price">${productPrice}</span>`;

  saveDataToLocalStorage();
  calculateTotal();
}

function calculateTotal() {
  let total = 0;

  for (let i = 0; i < ombor.length; i++) {
    const productPrice = parseFloat(ombor[i][1]);
    if (!isNaN(productPrice)) {
      total += productPrice;
    }
  }

  const formattedTotal = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  elTotalResult.textContent = `Jami: ${formattedTotal} so'm`;
}

function saveDataToLocalStorage() {
  localStorage.setItem("ombor", JSON.stringify(ombor));
}

drawPage();
calculateTotal();
