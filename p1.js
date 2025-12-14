const apiBase = "/api";
let products = [];
let cart = [];
const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("search");
const categoriesEl = document.getElementById("categories");
const sortEl = document.getElementById("sort");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
const modal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

function showToast(text) {
  toast.textContent = text;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2000);
}

async function fetchProducts() {
  const res = await fetch(apiBase + "/products");
  products = await res.json();
  renderProducts();
}

function formatPrice(p) {
  return "€" + p.toFixed(2);
}

function renderProducts() {
  const q = searchInput.value.trim().toLowerCase();
  const activeCat =
    document.querySelector("#categories .active")?.dataset.cat || "all";
  let list = products.filter((p) => {
    if (activeCat !== "all" && p.category !== activeCat) return false;
    if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q))
      return false;
    return true;
  });
  const min = Number(document.getElementById("minPrice").value || 0);
  const maxv = Number(document.getElementById("maxPrice").value || 0);
  if (min) list = list.filter((p) => p.price >= min);
  if (maxv) list = list.filter((p) => p.price <= maxv);
  const sort = sortEl.value;
  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
  resultsCount.textContent = `${list.length} products`;
  productGrid.innerHTML = "";
  for (const p of list) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<div class="img" style="background-image:url('${
      p.image
    }')"></div>
      <h4>${p.name}</h4>
      <div class="meta"><div class="price">${formatPrice(
        p.price
      )}</div><div class="cat">${p.category}</div></div>
      <div class="actions"><button class="btn secondary" data-id="${
        p.id
      }">View</button><button class="btn primary" data-buy="${
      p.id
    }">Add to Cart</button></div>`;
    productGrid.appendChild(card);
  }
  attachCardEvents();
}

function attachCardEvents() {
  document.querySelectorAll("[data-id]").forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const p = products.find((x) => x.id == id);
      openModal(p);
    };
  });
  document.querySelectorAll("[data-buy]").forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.buy;
      addToCart(id);
    };
  });
}

function openModal(p) {
  modalContent.innerHTML = `<div style="display:flex;gap:18px;flex-wrap:wrap">
    <div style="min-width:260px;flex:1"><img src="${
      p.image
    }" style="max-width:100%;border-radius:8px" /></div>
    <div style="flex:1;min-width:260px">
      <h2>${p.name}</h2>
      <p>${p.description}</p>
      <div style="font-weight:700">${formatPrice(p.price)}</div>
      <div style="margin-top:10px">
        <button id="modalAdd" class="btn primary">Add to Cart</button>
      </div>
    </div>
  </div>`;
  modal.classList.remove("hidden");
  document.getElementById("modalAdd").onclick = () => {
    addToCart(p.id);
    modal.classList.add("hidden");
  };
}

modalClose.onclick = () => modal.classList.add("hidden");
modal.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};

function addToCart(id) {
  const product = products.find((p) => p.id == id);
  const found = cart.find((c) => c.id == id);
  if (found) found.qty++;
  else
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);
  showToast("Added to cart");
}

searchInput.addEventListener(
  "input",
  debounce(() => renderProducts(), 200)
);
sortEl.addEventListener("change", () => renderProducts());
document
  .getElementById("applyPrice")
  .addEventListener("click", () => renderProducts());
categoriesEl.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  document
    .querySelectorAll("#categories li")
    .forEach((x) => x.classList.remove("active"));
  li.classList.add("active");
  renderProducts();
});
cartBtn.addEventListener("click", () => openCart());

function openCart() {
  const html =
    cart.length === 0
      ? '<div style="padding:20px">Cart is empty</div>'
      : `<div style="padding:12px">
    ${cart
      .map(
        (i) =>
          `<div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0"><div>${
            i.name
          } x ${i.qty}</div><div>${formatPrice(i.price * i.qty)}</div></div>`
      )
      .join("")}
    <div style="display:flex;justify-content:space-between;font-weight:700;padding-top:12px">Total<div>${formatPrice(
      cart.reduce((s, i) => s + i.price * i.qty, 0)
    )}</div></div>
    <div style="margin-top:12px"><button id="checkout" class="btn primary">Checkout</button></div>
  </div>`;
  modalContent.innerHTML = html;
  modal.classList.remove("hidden");
  const checkout = document.getElementById("checkout");
  if (checkout)
    checkout.onclick = () => {
      checkoutOrder();
    };
}

function checkoutOrder() {
  fetch(apiBase + "/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }),
  }).then((r) => {
    if (r.ok) {
      cart = [];
      cartCount.textContent = "0";
      showToast("Order placed");
      modal.classList.add("hidden");
    } else showToast("Checkout failed");
  });
}

function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

window.onload = () => fetchProducts();
