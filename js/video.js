console.log('video js');
// fetch,load and show catagories on HTML
const loadCatagories=() =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log(err))
}
const displayCatagories=(arr) => {
    const catagoriesContainer=document.getElementById('category-container')
   arr.forEach((item)=>{
    console.log(item);

    const button=document.createElement('button');
    button.classList='btn';
    button.innerText=item.category;
    catagoriesContainer.append(button);
   })
}
loadCatagories();