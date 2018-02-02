$(function() {
  $("#submit").on("click", function(event) {
    var textInput = document.querySelector("#countries").value;
    makeCall(textInput);
  });

  $("#update").submit(e => {
    e.preventDefault();
    const id = $(e.target).data("del-id");
    const name = $(e.target).data("country-name");
    const data = $(e.target).serialize();
    console.log("data", data, name);
    $.ajax({ 
        url:`/countryview/${name}/${id}`,
        data:data,
        type:"PUT",
        error:function(){

        },
        success:function(response){
          console.log(response);
          window.location.href = "/viewDestination"
        }
                  
  
      
    })
  })





  // const countryID = $("#deleteButton").data("countryID");
  console.log("countryID",$("#del-btn").data("del-id"));

$("#deleteButton").click(function(){
})


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
          name :countryName,
          population : population,
          capital : capital,
          flag_url : image_url
        },
        function(data){
          console.log(`posted! ${data}`)
          $('#result').html(data);
        }
      )
    })
  }

const $updateButton = $("#updateButton");
$updateButton.submit(e=>{
  e.preventDefault();
  console.log("submitted");
});



// --------------------------------------------------------------------
  // Delete functionality for the /users/trains page
  const $deleteBtn = $('#del-btn');
  $deleteBtn.click(e => {
    e.preventDefault();
    console.log("*****(&(**(%%%");
    const countryID = e.target.getAttribute('data-del-id');
    const data = $(e.target).serialize();
    $.ajax({
      method: "delete",
      data : data,
      url: `/countryview/${countryID}`,
      success: data => {
        window.location.href = "/viewDestination";
      }
    })
  });
});
 // ends doc.ready


