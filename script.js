const apiBaseUrl = "https://g07vs7aqif.execute-api.us-east-1.amazonaws.com/products";

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    productID: document.getElementById("productID").value,
    productName: document.getElementById("productName").value,
    productCategory: document.getElementById("productCategory").value,
    productDescription: document.getElementById("productDescription").value,
    productPrice: parseFloat(document.getElementById("productPrice").value),
    productQuantity: parseInt(document.getElementById("productQuantity").value)
  };

  const res = await fetch(`${apiBaseUrl}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  if (res.ok) {
    alert("Product added successfully!");
    loadProducts();
  } else {
    alert("Failed to add product.");
  }
});

async function loadProducts() {
  const res = await fetch(apiBaseUrl);
  if (!res.ok) {
    alert("Failed to load products.");
    return;
  }

  const products = await res.json();
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.productID}: ${p.productName} - $${p.productPrice} (${p.productCategory}) | Qty: ${p.productQuantity}`;
    list.appendChild(item);
  });
}

// Load products on page load
window.onload = loadProducts;
