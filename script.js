// switcher theme mode
let isLightMode = localStorage.getItem('lightMode');

const themeBtn = document.querySelector('.theme-mode-btn');

const enableLightMode =()=> {
  document.body.classList.add('lightmode');
  localStorage.setItem('lightMode', 'enabled');
}
const disbleLightMode =()=> {
  document.body.classList.remove('lightmode');
  localStorage.setItem('lightMode', null);
}
if(isLightMode === 'enabled') {
  enableLightMode();
}

themeBtn.addEventListener('click', ()=> {
  
  isLightMode = localStorage.getItem('lightMode');
  if(isLightMode !== 'enabled') {
    
    enableLightMode();
    
  } else {
    
    disbleLightMode();
    
  }
  
});


// clicking dropdown
( dropdown => {
  
  dropdown.addEventListener('click', ()=> {
    document.querySelector('.dropdown-head i').classList.toggle('down');
    document.querySelector('.dropdown-body').classList.toggle('show');
  })
  
})(document.querySelector('.dropdown-region'));

// get lists countries
fetch('https://restcountries.com/v2/all')
.then(response => response.json())
.then(result => {
  
  // create li list
  let books = '';
  result.forEach(res => books += listCountry(res));
  
  
  // append list to its container
  document.querySelector('.list-countries-container').innerHTML = books;
  
  
  // get countries by region
  document.querySelector('.dropdown-region').addEventListener('click', (e)=> {
    if(e.target.classList.contains('region')) {
      
      let region = e.target.textContent;
      getCountryByRegion(result, region);
      
    }
  });
  
  
});

// get country by name
(search => {
  
  const searchInput = document.querySelector('.search-input');
  // search by click enter btn
  search.addEventListener('keyup', e => {
    if(e.keyCode === 13) {
      
      let searchInputValue = searchInput.value;
      getCountryByName(searchInputValue);
      
    }
  });
  // search by click icon search
  search.addEventListener('click', e => {
    if (e.target.classList.contains('icon-search')) {
      
      let searchInputValue = searchInput.value;
      getCountryByName(searchInputValue);
      
    }
  });
  
})(document.querySelector('.search-box'));

function getCountryByName(name) {
  
  const countriesContainer = document.querySelector('.list-countries-container');
  fetch(`https://restcountries.com/v2/name/${name}`)
    .then(response => response.json())
    .then(country => {
      
      let countries = '';
      country.forEach(ct => countries += listCountry(ct));
  
      countriesContainer.innerHTML = countries;
  
    })
    .catch(() => {
      
      const h6 = document.createElement('h6');
      h6.classList.add('error-txt');
      h6.innerHTML = 'Not Found';
      console.log(h6)
      countriesContainer.innerHTML = h6.innerHTML;
      
    });
  
}

// get countries by filter region
function getCountryByRegion(countries, region) {
  
  const filterCountries = Array.from(countries.filter(country => country.region == region));
  
  let listCountries = '';
  filterCountries.forEach(country => listCountries += listCountry(country));
  
  // append list countries to its container
  document.querySelector('.list-countries-container').innerHTML = listCountries;
  
}

// create list function
function listCountry(country) {
  
  return `
          <li class='list-country-contain'>
            <a href='detail/detail.html' class='list-country' data-alpha=${country.alpha3Code}>
             <div class="flag-head">
              <img src=${country.flags.png} alt="${country.name}'s flag">
              </div> 
              <div class="concise-body">
               <h2 class="country-name">${country.name}</h2>
               <h3>Population: <span class="population">${country.population}</span></h3> 
               <h3>Region: <span class="region">${country.region}</span>
               </h3>
               <h3>Capital: <span class="capital">${country.capital}</span></h3>
               </div>
            </a>
          </li>
         `;
         
}

/*function getCountries() {
  
  const countries = document.querySelectorAll('.list-country');
  console.log('cc', countries[0]);
  
  return new Promise(result, reject) {
    
  }
  
}*/



const container = document.querySelector('.list-countries-container');
container.addEventListener('click', (e)=> {
  
  let alpha = e.target.closest('.list-country').dataset.alpha;
  localStorage.setItem('country', alpha);
  
});