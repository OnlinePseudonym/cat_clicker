(function() {
  const cats = ['Mittens', 'Ser Pounce', 'Simba', 'Thomas O\'Malley', 'Leo', 'Tabby'];
  const elem = document.getElementById('cats');
  const counter = document.getElementById('click-counter');
  let clickCounter = 0;

  fetch('https://api.unsplash.com/search/photos?page=1&query=kitty', {
    headers: {
      Authorization: 'Client-ID c2a8dc48e99f388612aaceab726995bfb362915795f0a63527a37c9dfef7c1dd'
    }
  }).then(response => response.json())
  .then(addImages)
  .then(addNav)
  .catch(e => requestError(e, 'image'));

  function addImages(data) {
    for( let i = 0; i < cats.length; i++) {
      let htmlContent = '';
      const image = data.results[Math.floor(Math.random() * (data.results.length))];
      const cat = cats[i].toLowerCase().replace(' ', '-');
      if (image) {
        htmlContent = `<figure id="${cat}" class="kittens" style="display:none;"><h2>${cats[i]}</h2>
        <img id="${cat}-pic" src="${image.urls.small}" alt="Cat">
        <figcaption>by ${image.user.name}</figcaption>
        <div id="${cat}-counter">0</div>
        </figure>`;
      } else {
        htmlContent = 'Unfortunately, we couldn\'t find a cat.'
      }
      elem.insertAdjacentHTML('afterbegin', htmlContent);
      setCounter(cat);
    }
  }

  function addNav() {
    elem.insertAdjacentHTML('beforebegin', '<div id="nav"></div>')
    for( let i = 0; i < cats.length; i++) {
      let htmlContent = '';
      const cat = cats[i].toLowerCase().replace(' ', '-');
      htmlContent = `<div id="${cat}-nav">${cats[i]}</div>`
      document.getElementById('nav').insertAdjacentHTML('afterbegin', htmlContent)
      switchVisibility(cat);
    }
  }

  function setCounter(target) {
    document.getElementById(`${target}-pic`).addEventListener('click', function() {
      let content = document.getElementById(`${target}-counter`).innerHTML;
      console.log(content);
      document.getElementById(`${target}-counter`).innerHTML = (parseInt(content)+1).toString();
    });
  }

  function switchVisibility(target) {
    console.log(target);
    const cat = document.getElementById(`${target}`)
    console.log(cat);
    document.getElementById(`${target}-nav`).addEventListener('click', function() {
      if (cat.style.display === 'none') {
        cat.style.display = 'block';
      } else {
        cat.style.display = 'none';
      }
    })
  }
})();
