const settings = {
  url: 'https://restcountries.eu/rest/v2/all',
  method: 'GET',
  timeout: 0,
};
//
$.ajax(settings).done(function(response) {
  response.forEach(element => {
    $('#select').append(
      `<option value=${element.alpha3Code}> ${element.name}</option>`
    );
  });
});
//
$('#form').submit(function(event) {
  event.preventDefault();
  console.log('hi');
});
//
$(document).ready(function() {
  // map start
  const app = new Mapp({
    element: '#app',
    presets: {
      latlng: {
        lat: 36,
        lng: 52,
      },
      zoom: 5,
    },
    apiKey:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNjNzk2ZDgyM2Q4NGI5MDczYTVhMzk1YWI0YWU2MTZlMjE1MWExZDMyZmFmMjhiMmUyZjNlMDFkNzRmZTRhZWQ4YjhmMmZiNGY5NzFkZmIzIn0.eyJhdWQiOiI5NTI5IiwianRpIjoiM2M3OTZkODIzZDg0YjkwNzNhNWEzOTVhYjRhZTYxNmUyMTUxYTFkMzJmYWYyOGIyZTJmM2UwMWQ3NGZlNGFlZDhiOGYyZmI0Zjk3MWRmYjMiLCJpYXQiOjE1OTE0NDUzMjksIm5iZiI6MTU5MTQ0NTMyOSwiZXhwIjoxNTk0MDM3MzI5LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.r6d7NdhY0jwA_39wrChHvjQbnLTpseQU1GjpOcOnR3YWbrxBTGxCyS6Fm9fa3SEnXPdx46W1XwX_lwBddTS5h2B40vCHeyqV9SdI5mV6xI1NFJ0iGNJJz_7SusuPAKDy41xZuJywvihLLW5aUTk9wpmNuXiOY8gM8MOsnK__YSbVLp2Kle301sP7t5dnL5SNLFjQSdcDz6eOE6Sw_kEwOLo6aYpGBlUrYuBsuMvZI--3tAFFbdppbt-TjnzurV6h0lOC18Nm4WFZFOXwRzD5NgqwjBlbOVGeRPWNQWOLruEluoHNV-JQ3cKDRsoiGtxntKFmOWyVzHYc9lecAhzf_g',
  });
  app.addLayers();
  // map ready
  $('#select').change(function() {
    // animate
    $('.first-row').removeClass('closed1');
    $('.second-row').removeClass('closed2');
    $('img').animate({ opacity: '0' }, 'fast');
    $('.info').animate({ opacity: '0' }, 'fast');
    $('.calling-code').animate({ opacity: '0' }, 'fast');
    // get info
    $.ajax({
      url: `https://restcountries.eu/rest/v2/alpha/${$(this).val()}`,
      method: 'GET',
    }).done(function(response) {
      // info
      $('.info').html(`
      <h3>${response.name}</h3>
      <p><strong>Native name:</strong>${response.nativeName}</p>
      <p><strong>Capital:</strong> ${response.capital}</p>
      <p><strong>Region:</strong> ${response.region},${response.subregion}</p>
      <p><strong>population:</strong> ${response.population}</p>
      <p><strong>languages:</strong> ${response.languages[0].name}</p>
      <p><strong>Timezone: </strong> ${response.timezones}</p>`);
      // calling
      $('.calling-code').html(`<h1>${response.callingCodes}</h1>`);
      // flag
      $('.flag img').attr('src', response.flag);
      // weather
      $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${
          response.capital
        }&appid=249a5e3bd1fa12d2e9371b9a3ce677ae`,
        method: 'GET',
      }).done(function(response) {
        $('.weather-div').html(`
          <img src="http://openweathermap.org/img/wn/${
            response.weather[0].icon
          }@2x.png" alt="">
          <p><strong>wind speed:</strong>${response.wind.speed}</p>
          <p><strong>temperature:</strong> ${response.main.temp}</p>
          <p><strong>humadity:</strong> ${response.main.humidity}</p>
          <p><strong>visibility:</strong> ${response.visibility}</p>`);
      });
      // map

      // console.log(app);
      // // app.map._lastCenter.lat =response.latlng[0]
      // // app.map._lastCenter.lng=response.latlng[1]
      // console.log(response.latlng[0]);
      // console.log(response.latlng[1]);
      // console.log(app.map._lastCenter.lat);
      // console.log(app.map._lastCenter.lng);

      app.addMarker({
        name: 'basic-marker',
        latlng: {
          lat: response.latlng[0],
          lng: response.latlng[1],
        },
        popup: {
          title: {
            html: `${response.translations.fa}`,
          },
          open: true,
        },
      });
    });
    $('img').animate({ opacity: '1' }, 'slow');
    $('.info').animate({ opacity: '1' }, 'slow');
    $('.calling-code').animate({ opacity: '1' }, 'slow');
  });
});
