(function() {
  const cats = ['Mittens', 'Ser Pounce'];
  const elem = document.getElementById('cat-pictures');
  const counter = document.getElementById('click-counter');
  let clickCounter = 0;

  fetch('https://api.unsplash.com/search/photos?page=1&query=Cat', {
    headers: {
      Authorization: 'Client-ID c2a8dc48e99f388612aaceab726995bfb362915795f0a63527a37c9dfef7c1dd'
    }
  }).then(response => response.json())
  .then(addImages)
  .catch(e => requestError(e, 'image'));

  function addImages(data) {
    for( let i = 0; i < cats.length; i++) {
      let htmlContent = '';
      const image = data.results[Math.floor(Math.random() * (data.results.length))];
      const cat = cats[i].toLowerCase().replace(' ', '-');
      if (image) {
        htmlContent = `<h2>${cats[i]}</h2><figure>
        <img id="${cat}" src="${image.urls.small}" alt="Cat">
        <figcaption>by ${image.user.name}</figcaption>
        <div id="${cat}-counter">0</div>
        </figure>`;
      } else {
        htmlContent = 'Unfortunately, we couldn\'t find a cat.'
      }
      elem.insertAdjacentHTML('afterbegin', htmlContent);
      setListener(cat);
    }
  }
  function setListener(target) {
    document.getElementById(target).addEventListener('click', function() {
      let content = document.getElementById(`${target}-counter`).innerHTML;
      console.log(content);
      document.getElementById(`${target}-counter`).innerHTML = (parseInt(content)+1).toString();
    });
  }
})();
