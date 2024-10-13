console.log("video js");
// fetch,load and show catagories on HTML
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log(err));
};
const displayCatagories = (arr) => {
  const catagoriesContainer = document.getElementById("category-container");
  arr.forEach((item) => {
    console.log(item);

    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    catagoriesContainer.append(button);
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
    </div>
  </div>
        `;
    videoContainer.appendChild(div);
  });
};
loadVideos();
