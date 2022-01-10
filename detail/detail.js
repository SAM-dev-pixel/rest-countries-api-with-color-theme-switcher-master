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

themeBtn.addEventListener('click', () => {

  isLightMode = localStorage.getItem('lightMode');
  if (isLightMode !== 'enabled') {

    enableLightMode();

  } else {

    disbleLightMode();

  }

});


// get country
let alpha = localStorage.getItem('country');

  function getDetailCountry(alpha) {
  
  
    fetch('https://restcountries.com/v2/alpha/' + alpha)
      .then(response => response.json())
      .then(country => {
  
        document.querySelector('.detail-container').innerHTML = createDetailCountry(country);
        
        createBorder(country);
        
        catchBorder();
        
      });
  
}
getDetailCountry(alpha);

function createDetailCountry(country) {
  
  let languages = country.languages.map(language => language.name).join(', ');
  
  return `
  <div class="hero-flag">
        <img src="${country.flag}" alt="">
      </div>
      
      <div class="detail-body">
      <h2 class="country-name">${country.name}</h2>
        <div class="part-contain">
          <div class="left-part">
          <h3>Native Name: <span>${country.nativeName}</span></h3>
          <h3>Population: <span>${country.population}</span></h3>
          <h3>Region: <span>${country.region}</span></h3>
          <h3>Sub Region: <span>${country.subregion}</span></h3>
          <h3>Capital: <span>${country.capital}</span></h3>
        </div>
        
        <div class="right-part">
          <h3>Top Level Domain: <span>${country.topLevelDomain[0]}</span></h3>
          <h3>Currencies: <span>${country.currencies[0].name}</span></h3>
          <h3>Languages: <span>${languages}</span></h3>
        </div>
        </div>
        
        <div class="border-countries-container">
          <h4>Border Countries:</h4>
          <div class="border-countries">
          </div>
        </div>
      </div>
  `
  
}


function createBorder(country) {

  const borderContainer = document.querySelector('.border-countries');

  return country.borders.forEach(border => {
    const a = document.createElement('a');
    a.innerHTML = border;
    a.href = 'detail.html';
    a.target = '_blank';
    a.classList.add('border');
    return borderContainer.append(a);
  });
  
}


function catchBorder() {
  
  document.querySelector('.border-countries').addEventListener('click', (e) => {
  
    if (e.target.classList.contains('border')) {
      localStorage.setItem('country', e.target.textContent);

      getDetailCountry(alpha);
    }
  
  });
  
}