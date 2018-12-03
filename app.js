//DOG api
/*
a - In this lab you're gonna build a single-page application (SPA)
b - There should only exist a single html file
c - You're gonna build an application for viewing images of dogs
d - Dog API  = https://dog.ceo/dog-api/documentation/
e - On the front page of the application
      1 - a table or list of some kind should list all the different breeds of dogs that can be viewed
          List all breeds API =  https://dog.ceo/api/breeds/list/all
      2 - Each breed should link to a new "page" 
      3 - list multiple images of dogs using the "by breed" endpoint (see documentation for information)
      4 - Each new page should have a proper navigation route, meaning after entering a breed page, a refresh of the site should navigate you to the same place (Tips is to use the hash "#" property of window.location)
      5 - Each breed site should have a list of all sub-breeds that exists (if any) for the breed
          a - These should work similary to the breeds,
          b - linking to a seperate sub-breed site where both a list of images should be shown
      6 - Each breed and sub-breed site should also render the name of the breed we're looking at
      7 - On each site (index, breed, sub-breed), there should also exists a random image (see "Random image" in the documentation)
      8 - and a button that refreshes this random image. When under breed or sub-breed site, 
          the random image should be of the breed or sub-breed.

 //adds
   npm :
        1 - https://beta.observablehq.com/@spencermountain/wtf_wikipedia
   wiki dog info
      origin
      age of the dog
      size
      color


      api img : 
      api all https://dog.ceo/api/breeds/list/all
*/
let model = {
   currentDog: null,
   currentDogImages: null,
   dogsList: []
};

fetch('https://dog.ceo/api/breeds/list/all')
   .then(response => response.json())
   .then(data => {
      for (const key in data.message) {
         if (data.message.hasOwnProperty(key) && data.message[key] == 0) {
            model.dogsList.push({
               name: key
            })
            $('#list ul').append(`
            <li><a href=#${key}>${key}</a></li>
         `)
         } else {
            data.message[key].map(subDog => {
               model.dogsList.push({
                  name: key + '-' + subDog
               })
            });
            data.message[key].map(dog => {
               $('#list ul').append(`
                    <li><a href=#${key+'-'+dog}><span style="background:red">${key}</span><span style="margin-left:5px">${dog}</span></a></li>
                `)
            })
         }
      }
      model.currentDog = model.dogsList[0];
   })
   .then(() => {
      $('#list li').click(function () {
         let self = $(this)
         model.dogsList.map(dog => {
            if (self.children().attr('href').slice(1) == dog.name) {
               model.currentDog = dog;
               $('#name').html(model.currentDog.name);
               fetch('https://dog.ceo/api/breed/' + model.currentDog.name + '/images/random/15')
                  .then(res => res.json())
                  .then(data => {
                     $('#mainViewer img').attr('src', data.message[0])
                     $('#imageList').html('');
                     data.message.map(img => {
                        $('#imageList').append(`             
                        <div class="thumbnail">
                           <img src = ${img}>
                        </div>
                     `)
                     })
                  })
                  .then(() => {
                     $('.thumbnail').click(function () {
                        let self = $(this);
                        $('#mainViewer img').attr('src', $(this).children().attr('src'))
                     })
                  })
                  .catch(err => console.log(err))
            }
         })
      })
   })
   .then(() => {
      if (window.location.hash.length > 0) {
         model.dogsList.map(dog => {
            if (window.location.hash.slice(1) == dog.name) {
               model.currentDog = dog;
            }
         })
      }
      $('#name').html(model.currentDog.name);
      fetch('https://dog.ceo/api/breed/' + model.currentDog.name + '/images/random/15')
         .then(res => res.json())
         .then(data => {
            $('#mainViewer img').attr('src', data.message[0])
            $('#imageList').html('');
            data.message.map(img => {
               $('#imageList').append(`             
               <div class="thumbnail">
                  <img src = ${img}>
               </div>
            `)
            })
         })
         .then(() => {
            $('.thumbnail').click(function () {
               let self = $(this);
               $('#mainViewer img').attr('src', $(this).children().attr('src'))
            })
         })
         .catch(err => console.log(err))
   })


console.log()