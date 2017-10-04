(function() {
  let model = {
    cats: [
      {
        name: 'Mittens',
        clickCounter: 0,
        htmlContent: '',
        imageNumber: null,
        navContent: ''
      },{
        name: 'Ser Pounce',
        clickCounter: 0,
        htmlContent: '',
        imageNumber: null,
        navContent: ''
      },{
        name: 'Simba',
        clickCounter: 0,
        htmlContent: '',
        imageNumber: null,
        navContent: ''
      },{
        name: 'Thomas O\'Malley',
        clickCounter: 0,
        htmlContent: '',
        imageNumber: null,
        navContent: ''
      },{
        name: 'Leo',
        clickCounter: 0,
        htmlContent: '',
        imageNumber: null,
        navContent: ''
      },{
        name: 'Tabby',
        clickCounter: 0,
        htmlContent: '',
        imageNumber: null,
        navContent: ''
      }
    ],
    addImages: function(data) {
      //console.log(data);
      for( let i = 0; i < model.cats.length; i++) {
        const cat = model.cats[i].name.toLowerCase().replace(' ', '-');
        let ranNum = Math.floor(Math.random() * (data.results.length));
        while ( model.cats.map(function(obj) {
          //console.log(obj.imageNumber);
          return obj.imageNumber;
        }).indexOf(ranNum) > -1) {
          ranNum = Math.floor(Math.random() * (data.results.length));
        }
        model.cats[i].imageNumber = ranNum;
        const image = data.results[ranNum];

        model.cats[i].htmlContent = `<figure id="${cat}" class="kittens"><h2>${model.cats[i].name}</h2>
        <img id="${cat}-pic" src="${image.urls.small}" alt="Cat">
        <figcaption>by ${image.user.name}</figcaption>
        </figure>`;
      }
    },
    addNav: function() {
      for( let i = 0; i < model.cats.length; i++) {
        const cat = model.cats[i].name.toLowerCase().replace(' ', '-');

        model.cats[i].navContent = `<div id="${cat}-nav">${model.cats[i].name}</div>`;
      }
    }
  }


  fetch('https://api.unsplash.com/search/photos?page=1&query=kitty', {
    headers: {
      Authorization: 'Client-ID c2a8dc48e99f388612aaceab726995bfb362915795f0a63527a37c9dfef7c1dd'
    }
  }).then(response => response.json())
  .then(function(data) {
    model.addImages(data)
  })
  .then(model.addNav())
  .then(renderNav())
  .catch(e => requestError(e, 'image'));


  function renderNav() {
    document.getElementById('cats').insertAdjacentHTML('beforebegin', '<div id="nav"></div>');
    for( let i = 0; i < model.cats.length; i++) {
      const cat = model.cats[i].name.toLowerCase().replace(' ','-');
      document.getElementById('nav').insertAdjacentHTML('afterbegin', model.cats[i].navContent);
      console.log(`${cat}-nav`);
      document.getElementById(`${cat}-nav`).addEventListener('click', function() {
        renderCat(cat, i);
      });
    };
  }


  function renderCat(cat, index) {
    document.getElementById('cats').innerHTML = ''
    document.getElementById('cats').insertAdjacentHTML('afterbegin', model.cats[index].htmlContent);
    document.getElementById(cat).insertAdjacentHTML('beforeend', `<div id="${cat}-counter">${model.cats[index].clickCounter}</div>`)
    setCounter(index);
  }

  function setCounter(index) {
    const cat = model.cats[index].name.toLowerCase().replace(' ', '-');
    document.getElementById(`${cat}-pic`).addEventListener('click', function() {
      model.cats[index].clickCounter += 1;
      document.getElementById(`${cat}-counter`).innerHTML = model.cats[index].clickCounter;
    });
  }
})();
