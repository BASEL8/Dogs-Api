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
