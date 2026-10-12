
const products = [
    { name: "Nike Air Force", price: 1299000, category: "Krossovkalar", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85" },
    { name: "Adidas Sport", price: 999000, category: "Sport", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85" },
    { name: "Classic Shoes", price: 1599000, category: "Tuflilar", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=700&q=85" },
    { name: "Timberland", price: 1499000, category: "Botinkalar", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85" }
];

const grid = document.getElementById("product-grid");
let filter = "Barchasi";

function render() {
    let search = document.getElementById("search-input").value.toLowerCase();
    let sort = document.getElementById("sort-products").value;

    let list = products.filter(p =>
        (filter === "Barchasi" || p.category === filter) &&
        p.name.toLowerCase().includes(search)
    );

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);

    grid.innerHTML = list.map(p => `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
                <button class="favorite-btn"><i class="far fa-heart"></i></button>
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-description">${p.category}</p>
                <div class="product-bottom">
                    <span class="price">${p.price.toLocaleString("uz-UZ")} so‘m</span>
                </div>
            </div>
        </div>
    `).join("");

    document.getElementById("empty-message").hidden = list.length > 0;
}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = () => {
        filter = btn.dataset.filter;
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        render();
    };
});

document.getElementById("search-input").oninput = render;
document.getElementById("sort-products").onchange = render;

document.getElementById("search-submit").onclick = render;

document.addEventListener("click", e => {
    const heart = e.target.closest(".favorite-btn");
    if (heart) {
        heart.classList.toggle("liked");
        heart.innerHTML = heart.classList.contains("liked")
            ? '<i class="fas fa-heart"></i>'
            : '<i class="far fa-heart"></i>';
    }
});

document.getElementById("menu-toggle").onclick = () => {
    document.querySelector(".navbar").classList.toggle("show");
};

document.querySelectorAll(".navbar a").forEach(link => {
    link.onclick = () => document.querySelector(".navbar").classList.remove("show");
});

render();
