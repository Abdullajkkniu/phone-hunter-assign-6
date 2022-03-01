// show search result
const loadMobile =()=>{
  const searchField =document.getElementById('search-input');
  const searchText = searchField.value;
  const warnings = document.getElementById('warning')
  if(searchText ==0){
    warnings.style.display = 'block';
    const cardShow = document.getElementById('card-show');
    cardShow.textContent='';
    const detailsShow = document.getElementById('details-show');
    detailsShow.textContent = '';
  }
  else{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res =>res.json())
    .then(data => displayResult(data.data))
    warnings.style.display = 'none';
  }
  searchField.value = '';
  
}
const displayResult =(brand)=>{
  console.log(brand)
  var brands = brand.slice(0,20);
  const cardShow = document.getElementById('card-show');
  cardShow.textContent='';
  const detailsShow = document.getElementById('details-show');
detailsShow.textContent = '';

  if(brands==false){
    alert('Not found');
  }
  else{
    
    brands.forEach(phone=>{
      const div = document.createElement('div');
      div.classList.add('col')
      div.innerHTML =`
      <div class="card h-70 w-70 mb-10">
          <img class="w-60 h-50" src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <h5 class="card-title">${phone.brand}</h5>
            <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary">Details</button>
          </div>
        </div>
      `
      
      cardShow.appendChild(div)
        }
      )
    }
  }
// show details result
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
detailsShow.textContent = '';
const div = document.createElement('div');
  


div.innerHTML = `
<div class="card h-100 w-100 mb-4">
<img src="${details.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${details.name}</h5>

        <h5>Release date: ${details.releaseDate? details.releaseDate:'not found'}</h5>

        <p><span class="fw-bold">Main features:</span>

        <br>Storage: ${details.mainFeatures.storage? details.mainFeatures.storage: 'not found' },

        <br> Display-size : ${details.mainFeatures.displaySize? details.mainFeatures.displaySize: 'not found'},
        
        <br> chipSet : ${details.mainFeatures.chipSet? details.mainFeatures.chipSet:'not found'},<br> memory : ${details.mainFeatures.memory}, 
        
        <br> <span class="fw-bold">Sensor :</span> ${details.mainFeatures.sensors? details.mainFeatures.sensors:'not found'}</p>
      </div>
</div>
`
detailsShow.appendChild(div);
}