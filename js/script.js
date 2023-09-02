const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    displayTab(categories);
}

const displayTab = (categories) => {
    const tabContainer = document.getElementById("tab-container");
    categories.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleTabId(${category.category_id})" class="px-4 py-2 btn btn-sm font-semibold mx-2 cursor-pointer hover: rounded-lg bg-[#25252533]">${category?.category}</a>
        `;
        tabContainer.appendChild(div);
    });
}

let sortDatas;

const handleTabId = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const datas = data.data;
    displayDatas(datas);
    sortDatas = datas;
}
const displayDatas = (datas) => {
    if (datas.length === 0) {
        const emptyField = document.getElementById("emptyField");
        emptyField.classList.remove("hidden");
    } else {
        emptyField.classList.add("hidden");
    }
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    datas.forEach(data => {
        const div = document.createElement("div");
        div.classList = `card card-compact`;
        div.innerHTML = `
        <figure class="relative"><img src="${data.thumbnail}" alt="thumbnail" class="w-full h-[160px] rounded-xl"/>${data.others.posted_date ? `<span class="absolute right-2 bottom-2 bg-gray-900 px-3 py-1 rounded-md text-sm text-white">${secondsToHoursAndMinutes(data.others.posted_date)}<span/>` : ""}</figure>
        <div class="card-body">
          <div class="flex gap-3">
            <div class="mt-1">
                <img src="${data.authors[0].profile_picture}" class="w-10 h-10 rounded-full" alt="author"/>
            </div>
            <div>
                <h2 class="text-xl font-bold">${data.title}</h2>
                <h3 class="text-[#171717b3] font-semibold my-2">${data.authors[0].profile_name}${data.authors[0].verified ? '<img src="images/bluetick.jpg" alt="nothing" class="w-6 inline"/>' : ""}</h3>
                <h4 class="text-[#171717b3] font-semibold">${data.others.views} views</h4>
            </div>
          </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
}

const secondsToHoursAndMinutes = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const result = `${hours}hrs ${minutes} min ago`;
    return result;
}

const handleSortButton = () => {
    const sortedDatas = sortDatas.sort((x, y) => parseFloat(y.others.views) - parseFloat(x.others.views));
    displayDatas(sortedDatas);
}

loadData();
handleTabId("1000");

