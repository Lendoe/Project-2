$(function() {
  $("#submit").on("click", function(event) {
    var textInput = document.querySelector("#countries").value;
    makeCall(textInput);
  });

  function makeCall(country) {
    $.ajax(
      `https://restcountries.eu/rest/v2/name/${country}?fullText=true`,
      {
        success: function(data) {
          getData(data);
        }
      }
    );
  }

  function getData(responseData) {
    var name = responseData[0].name;
    var population = responseData[0].population;

    var capital = responseData[0].capital;

    var flag = responseData[0].flag;

    
    appendToDom(name, population, capital
      , flag);
  }

  function appendToDom(name, population, capital, flag) {
    $("#result").html(
      `
      <div>Name: <span id='country-name'>${name}</span></div>
      <div>Population: <span id='population'>${population}</span></div>
      <div>Capital: <span id='capital'>${capital}<span></div>
      <img src="${flag}" height="400" width="600"><br>
      <form action='/countryview/${name}' method='POST'>
        <input name='name' type='hidden' value=${name}>
        <input name='population' type='hidden' value=${population}>
        <input name='capital' type='hidden' value=${capital}>
        <input name='flag_url' type='hidden' value=${flag}>
        <input type='submit' value='Visit'>
      </form>
      `
    );
    $('#visit-button').on('click', function(event) {
      event.preventDefault();
      let countryName = document.getElementById('country-name').innerText;
      let population = document.getElementById('population').innerText;
      let capital = document.getElementById('capital').innerText;
      let image_url = document.querySelector('img').getAttribute('src');
      console.log(image_url);
      $.post(`/countryview/${countryName}`,
        {
          name: countryName,
          population,
          capital,
          flag_url: image_url
        },
        function(data){
          console.log(`posted! ${data}`)
          $('#result').html(data);
        }
      )
    })
  }
}); // ends doc.ready


