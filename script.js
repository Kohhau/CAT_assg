const apiBaseUrl = "https://g07vs7aqif.execute-api.us-east-1.amazonaws.com/products";

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value)
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

  const data = await res.json();
  const products = data.products; // get the products array
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.name} - $${p.price} (${p.category}) | stock: ${p.stock}`;
    list.appendChild(item);
  });
}

// Load products on page load
window.onload = loadProducts;
