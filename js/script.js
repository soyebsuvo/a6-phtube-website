const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    displayTab(categories);
}

const displayTab = (categories) => {
    const tabContainer = document.getElementById("tab-container");
    console.log(categories[0])
    categories.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleTabId(${category.category_id})" class="px-4 py-2 btn btn-sm font-semibold mx-2 cursor-pointer hover: rounded-lg bg-[#25252533]">${category?.category}</a>
        `;
        tabContainer.appendChild(div);
    });
}

const handleTabId = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    console.log(data);
}

loadData();