  const loadData = async () =>{
      const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
      const data = await response.json();

      const categoryArry = data.data;
  
      const categoryTab = document.getElementById("category_nav");
      
   
  
    //  categoryTab = classList.add("btn-active")

      categoryArry.forEach((category) => {
        // const categoryClass = loadCetegoryId(category.category_id);

   
         const div = document.createElement('div');
       
         div.innerHTML = `
        
         <button id="${category.category}" onclick = "loadCetegoryId(${category.category_id}) " class="btn active:btn-danger hover:bg-red-500 hover:text-white btn-active ">${category.category}</button>      
         `
         categoryTab.appendChild(div);
          

      });

     
    
    

  }


  


const loadCetegoryId = async (catId) =>{
    const loadCetegory = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catId}`);
    const cataId = await loadCetegory.json();

    if(cataId.status == false){
    
      const noVideoFund = document.getElementById("tube-container");
      	noVideoFund.classList = "grid justify-center w-full h-full "
      // noVideoFund.classList = ""
      noVideoFund.innerHTML = '';
      const div = document.createElement("div")
      div.innerHTML = 
        `
          <div class=" grid justify-center gap-y-10 mt-8 "> 
          <img class="w-36 mx-auto" src="./img/Icon.png">
          <div class="text-center text-5xl">Oops!! Sorry, There is no <br> content here</div>
          
          </div>
        `;
        noVideoFund.appendChild(div)
    }else{
      const videoCard = document.getElementById("tube-container");
      videoCard.classList = "tube-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
      videoCard.innerHTML = "";
 
  
  cataId.data.forEach((video) =>{
      const div =  document.createElement('div');
      const time = video.others.posted_date;
      const view = video.others.views;
 
     

      const authorProfile = video.authors[0].profile_picture;
      // const verified = video.authors[0].verified;
  
     

      // console.log(verified)
    
      div.innerHTML = `
      <div class="card  bg-base-100 shadow-xl p-5">
      <figure><img class = "w-full h-56 rounded-md relative" src="${video?.thumbnail ? video.thumbnail: " Sorry No"}" alt="${video.thumbnail}" />
     
  
      <div class="absolute text-white bottom-44 right-9 bg-[#e0e0e01b] rounded-md p-1 " >${timeConvert(time)? timeConvert(time) : ""} </div>
      
      </figure>
      <div class="card-body">
        <div class="flex gap-2">
          <div class="author_img">
            <img class="w-8 h-8 rounded-full" src="${authorProfile}"> 
          </div>
            <div class="author_details w-full">
                <h4 class=" font-bold"> ${video.title.slice(0,20 ) + "..."}</h4>
                <div class="flex gap-4">
                  
                  <span class="">${video.authors[0].profile_name}</span>
                  <span>${video.authors[0].verified ? '<img class="w-5" src ="./img/verified.png">' :""} </span>
                </div>
                <h3>${view} view</h3>
            </div>
    </div>
  
      </div>
      `
      videoCard.appendChild(div)
    
    })

    sort(catId)
    }
    // console.table(cataId)
   
   


    
}



const  defauld = async () => {

    const loadAll = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const loadData = await loadAll.json();
  
     
    const videoCard = document.getElementById("tube-container");
    videoCard.classList = "tube-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
    videoCard.innerHTML = "";


    loadData.data.forEach((video) =>{
      const time = video.others.posted_date;
      const view = video.others.views;
      const authorProfile = video.authors[0].profile_picture;

    const div =  document.createElement('div');
    div.innerHTML = `
    <div class="card  bg-base-100 shadow-xl p-5">
    <figure><img class = "w-full h-56 rounded-md relative" src="${video?.thumbnail ? video.thumbnail: " Sorry No"}" alt="${video.thumbnail}" />
   

    <div class="absolute text-white bottom-44 right-9 bg-[#e0e0e01b] rounded-md p-1 " >${timeConvert(time)? timeConvert(time) : ""} </div>
    
    </figure>
    <div class="card-body">
      <div class="flex gap-2">
        <div class="author_img">
          <img class="w-8 h-8 rounded-full" src="${authorProfile}"> 
        </div>
          <div class="author_details w-full ">
              <h3 class=" font-bold"> ${video.title.slice(0,25 ) + "..."}</h3>
              <div class="flex gap-4">
                
                <span class="">${video.authors[0].profile_name}</span>
                <span>${video.authors[0].verified ? '<img class="w-5" src ="./img/verified.png">' :""} </span>
              </div>
              <h3>${view} view</h3>
              
          </div>
  </div>

    </div>
    `
    videoCard.appendChild(div)

   
  })
    // console.table(cataId)
}
defauld()

loadData()



function timeConvert(num){
  if(num > 0 ){
    const second = num/60;

    const hours = Math.floor(second/60).toFixed(0);
    const minute = (second%60).toFixed(0);
    
  return  hours + " hrs " + minute+" min ago";
  }else{
    // console.log("No time")
  }
 
} 


const sort = async(catId) =>{
 
  const sortCatagory = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catId}`);
  const catagorySort = await sortCatagory.json();
  console.log(catagorySort.data.sort((a,b) => b.others.view - a.others.view))
 

};
// const categoryId = sort(catagorySort);
// loadCetegoryId(categoryId)