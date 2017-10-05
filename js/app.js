let model = {
  currentCat: null,
  cats: [
    {
      name: 'Mittens',
      clickCounter: 0,
      imageSource: '',
      caption: '',
      imageNumber: null
    },{
      name: 'Ser Pounce',
      clickCounter: 0,
      imageSource: '',
      caption: '',
      imageNumber: null
    },{
      name: 'Simba',
      clickCounter: 0,
      imageSource: '',
      caption: '',
      imageNumber: null
    },{
      name: 'Thomas O\'Malley',
      clickCounter: 0,
      imageSource: '',
      caption: '',
      imageNumber: null
    },{
      name: 'Leo',
      clickCounter: 0,
      imageSource: '',
      caption: '',
      imageNumber: null
    },{
      name: 'Tabby',
      clickCounter: 0,
      imageSource: '',
      caption: '',
      imageNumber: null
    }
  ]
};

let octopus = {
  init: function() {
    fetch('https://api.unsplash.com/search/photos?page=1&query=kitty', {
      headers: {
        Authorization: 'Client-ID c2a8dc48e99f388612aaceab726995bfb362915795f0a63527a37c9dfef7c1dd'
      }
    }).then(response => response.json())
    .then(function(data) {
      octopus.addImages(data);
    })

    catView.init();
    catNavView.init();
    adminView.init();
  },
  addImages: function(data) {
    const cats = model.cats;
    for( let i = 0; i < cats.length; i++) {
      const cat = cats[i];
      let ranNum = Math.floor(Math.random() * (data.results.length));
      while ( cats.map(function(obj) {
        return obj.imageNumber;
      }).indexOf(ranNum) > -1) {
        ranNum = Math.floor(Math.random() * (data.results.length));
      }
      cat.imageNumber = ranNum;
      const image = data.results[ranNum];

      cat.imageSource = image.urls.small;
      cat.caption = `by ${image.user.name}`;
    }
  },
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  getCats: function() {
    return model.cats;
  },
  incCounter: function() {
    model.currentCat.clickCounter += 1;
    catView.render();
  },
  submitForm: function() {
    model.currentCat.name = document.getElementsByName('name')[0].value;
    model.currentCat.imageSource = document.getElementsByName('imgUrl')[0].value;
    model.currentCat.clickCounter = parseInt(document.getElementsByName('#clicks')[0].value);
  }
}

let catNavView = {

  init: function() {
    this.render();
  },

  render: function() {
    document.getElementById('cat-nav').innerHTML = '';

    const cats = octopus.getCats();
    const frag = document.createDocumentFragment();

    for( let i = 0; i < cats.length; i ++) {
      const cat = cats[i];

      el = document.createElement('li');
      el.innerText = cat.name;
      frag.appendChild(el);

      el.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy)
          catView.render();
        };
      })(cat));
    }
    document.getElementById('cat-nav').appendChild(frag);
  }
}

let adminView = {
  init: function() {
    const admin = document.getElementById('admin-btn');
    const cancel = document.getElementById('cancel');
    const save = document.getElementById('save');
    const form = document.getElementById('admin-form');

    admin.addEventListener('click', function() {
      if (octopus.getCurrentCat()) {
        form.setAttribute('style', 'display:block;');
        adminView.render();
      }
    }),
    cancel.addEventListener('click', function() {
      form.setAttribute('style', 'display:none;');
    }),
    save.addEventListener('click', function() {
      octopus.submitForm();
      catView.render();
      catNavView.render();
    })
  },

  render: function() {
    const cat = octopus.getCurrentCat();

    document.getElementsByName('name')[0].value = cat.name;
    document.getElementsByName('imgUrl')[0].value = cat.imageSource;
    document.getElementsByName('#clicks')[0].value = cat.clickCounter;
  }
}

let catView = {
  init: function() {
    document.getElementById('pic').addEventListener('click', function() {
      octopus.incCounter();
    })
  },
  render: function() {
    const cat = octopus.getCurrentCat();

    document.getElementById('name').innerText = cat.name;
    document.getElementById('pic').src = cat.imageSource;
    document.getElementById('caption').innerText = cat.caption;
    document.getElementById('counter').innerText = cat.clickCounter;

  }

}

octopus.init();
