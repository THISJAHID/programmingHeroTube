// const loadData = () =>{
//     fetch("https://openapi.programming-hero.com/api/news/categories")
//     .then((res) => res.json())
//     .then((data) => console.log(data.data))
//     // .catch((err)=> console.log(err))
// };
// loadData();

// const loadData = async () => {
//     const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
//     const data = await response.json();
//     console.log(data)

// };
// loadData();  async Load data line by line

// const handleData = async () =>{
//     const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
//     const data = await res.json();
//     console.log(data)
// }
// handleData();

const loadData = async () =>{
    const tabContainer = document.getElementById('tab-container');

    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const categoryArry = data.data.news_category.slice(0,4);

    categoryArry.forEach((category) => {
    
     const div = document.createElement('div');
        div.innerHTML = `
        <a onclick ="loadCetegoryId('${category.category_id}')" class="tab ">${category.category_name}</a>  

        `;
        tabContainer.appendChild(div);
     
    });

    
    

};
const loadCetegoryId = async (categoryId) => {
  
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();

    const newsCard = document.getElementById('card-container');
    newsCard.innerHTML = "";
    data?.data.forEach((news) =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src="${news?.image_url}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${news.title.slice(0, 30)}</h2>
          <h2 class="card-title">${news.rating.badge}</h2>
          <p>${news?.author?.name}</p>
          <p>${news?.total_view ? news.total_view : "No views"}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Details</button>
          </div>
        </div>
      </div>
        `
        newsCard.appendChild(div)

        console.log(news.author.name)
    })
}


const handleModal = (modal) =>{
    const div = document.createElement
}

loadData();