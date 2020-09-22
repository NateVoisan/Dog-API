'use strict';

function getDogImage() {
  let breed = $('#breeds').val();
  if (breed.length > 0) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/${$('.number-of-dogs').val() ? $('.number-of-dogs').val() : 3}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
  } else {
    fetch(`https://dog.ceo/api/breeds/image/random/${$('.number-of-dogs').val() ? $('.number-of-dogs').val() : 3}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
  }
}

function displayResults(responseJson) {
  console.log(responseJson);
  const images = responseJson.message.map(dogImages => 
  `<img src="${dogImages}" class="results-img">`)
  $('.results').html(images.join(' '));
  $('.results').removeClass('hidden');
}

function getDogBreeds() {
  fetch(`https://dog.ceo/api/breeds/list/all`)
  .then(response => response.json())
  .then(response => loadBreeds(response))
    .catch(error => alert('Something went wrong. Try again later.'))
}

function loadBreeds(breeds) {
  const options = Object.keys(breeds.message).map(breed => 
  `<option value=${breed}>${breed}</option>`);
  $('#breeds').html(options.concat(`<option value='' selected='selected'>-Choose breed-</option>`))
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getDogImage();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  getDogBreeds();
  watchForm();
});