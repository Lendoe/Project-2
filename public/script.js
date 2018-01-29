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
      <div>Name: ${name}</div>
      <div>Population: ${population}</div>
      <div>Capital: ${capital}</div>
      <img src="${flag}" height="400" width="600">
      `
      );
  }
}); // ends doc.ready
