console.log("video js");
// fetch,load and show catagories on HTML
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log(err));
};

// make every btn inactive
const activeBtnRemove=() =>{
  const btn=document.getElementsByClassName("category-btn");
  for(const item of btn){
    item.classList.remove("active");
  }
}
//load category wise videos
const loadCategoryVideos= (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then((res) => res.json())
  .then((data) => {
    activeBtnRemove();
    const activeBtn=document.getElementById(`btn-${id}`);
    activeBtn.classList.add('active');
    displayVideos(data.category)
  })
  .catch((err) => console.log(err));
}

//details showing function
const showDetails= async (id) =>{
  // fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
  // .then((res) => res.json())
  // .then((data) => console.log(data.video.description))
  // .catch((err) => console.log(err));
  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  const res=await fetch(url);
  const data=await res.json();
  console.log(data.video.description);
  // get the div
  const detailContainer=document.getElementById('modal-content');
  detailContainer.innerHTML=`
   <img src="${data.video.thumbnail}">
   <p>${data.video.description}</p>
  `
  // click the modal button 
  // way-1
  // document.getElementById("showModalBtn").click();
  // way-2 
  document.getElementById("customModal").showModal();
}
const displayCatagories = (arr) => {
  const catagoriesContainer = document.getElementById("category-container");
  arr.forEach((item) => {
    console.log(item);

    // const button = document.createElement("button");
    // button.classList = "btn";
    // button.innerText = item.category;
    const buttonContainer=document.createElement('div');
    buttonContainer.innerHTML=`
    <button id="btn-${item.category_id}" class="btn category-btn" onclick="loadCategoryVideos(${item.category_id})">
    ${item.category}
    </button>
    `;
    catagoriesContainer.append(buttonContainer);
  });
};
loadCatagories();

//time-inversion
function invertion(time){
    const hour=parseInt(time/3600);
    let remainingSecond=(time%3600)
    const minute=parseInt(remainingSecond/60);
    const second=remainingSecond%60;
    return `${hour} hour ${minute} minute ${second} second ago`;
}
// Load videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

const displayVideos = (data) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML=" ";
  if(data.length ==0){
    videoContainer.classList.remove('grid');
      videoContainer.innerHTML=`
      <div class="flex flex-col min-h-[300px] gap-5 items-center justify-center">
          <img src="Icon.png">
          <h2 class="font-bold text-center text-xl">No contents here in this category
          </h2>
      </div>
      `;
      return;
  }
  else{
    videoContainer.classList.add("grid");
  }
  data.forEach((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
           <figure class="h-[200px] relative">
           ${
             item.others.posted_date?.length == 0 ? " " : `<span class="absolute right-0 bottom-0 text-white bg-black"> ${invertion(item.others.posted_date)} </span>`
           }
    <img class="h-full w-full object-cover"
      src="${item.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2 flex gap-2 items-center">
    <div>
       <img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}">
    </div>
    <div>
    <h2 class="font-bold">${item.title}</h2>
    <div class="flex item-center gap-2">
       <p class="text-gray-400">${item.authors[0].profile_name}</p>
       ${ item.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">` : " "                        
       }
    </div>
    <p class="text-gray-400 text-sm">${item.others.views} views</p>
    <button class="btn btn-error btn-sm" onclick="showDetails('${item.video_id}')">details</button>
    </div>
  </div>
        `;
    videoContainer.appendChild(div);
  });
};
loadVideos();
