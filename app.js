const loadMobile =()=>{
    const searchField =document.getElementById('search-input');
    const searchText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res =>res.json())
    .then(data => displayResult(data.data))
}
const displayResult =(brand)=>{
    console.log(brand)
    const cardShow = document.getElementById('card-show')
    
    for(const phone of brand){
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML =`
        <div class="card h-100 w-100 mb-10">
            <img class="w-100" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.brand}</h5>
              <h5 class="card-title">${phone.phone_name}</h5>
              <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
          </div>
        `
        cardShow.appendChild(div)
    }
}

const loadDetails =(phoneId)=>{
console.log(phoneId)
const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`
fetch(url)
.then(res => res.json())
.then(data =>displayDetails(data.data))
}

const displayDetails =(details)=>{
console.log(details)
const detailsShow = document.getElementById('details-show');
const div = document.createElement('div');
div.innerHTML = `
<img src="${details.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${details.name}</h5>
          <h3>Release date: ${details.releaseDate}</h3>
          <p><span class="fw-bold">Main features:</span>Storage: ${details.mainFeatures.storage},<br> Display-size : ${details.mainFeatures.displaySize}, <br> chipSet : ${details.mainFeatures.chipSet},<br> memory : ${details.mainFeatures.memory}, <br> <span class="fw-bold">Sensor :</span> ${details.mainFeatures.sensors}</p>

          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
`
detailsShow.appendChild(div);
}