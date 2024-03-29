window.addEventListener('load', ()=> {
let long; 
let lat; 
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span');

if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(appLocation => {
long = appLocation.coords.longitude; 
lat = appLocation.coords.latitude; 


const proxy ='https://cors-anywhere.herokuapp.com/'
const api = `${proxy}
https://api.darksky.net/forecast/3a861dc36e918cb4070a27e95f853a84/${lat},${long}`;

fetch(api)
.then(signal =>{ 
    return signal.json(); 

})
.then(data => {
  const { temperature, summary, icon } = data.currently;
  //Set DOM Elements fron the API 
  temperatureDegree.textContent =temperature;
  temperatureDescription.textContent = summary;
  locationTimezone.textContent = data.timezone; 

// Formula for Celsius 
let celsius = (temperature - 32) * (5/9);


//set icon 
setIcons(icon, document.querySelector(".icon"));

//Change temperature to Celsius/Farenhit 
temperatureSection.addEventListener('click', () => {

if(temperatureSpan.textContent === "F") {
    temperatureSpan.textContent = "C"; 
temperatureDegree.textContent = Math.floor(celsius); 
} else {
    temperatureSpan.textContent = "F"; 
    temperatureDegree.textContent = temperature; 
}

});



   });
});  
    
}
function setIcons(icon, iconId) {
    const skycons = new Skycons ({color: "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
    
}
}); 


