(function() {

    const elem = document.getElementById('cat-picture');
    const counter = document.getElementById('click-counter');
    let clickCounter = 0;

    elem.addEventListener('click', function() {
        clickCounter += 1;
        counter.innerHTML = clickCounter;
    }, false);

    fetch('https://api.unsplash.com/search/photos?page=1&query=Cat', {
        headers: {
            Authorization: 'Client-ID c2a8dc48e99f388612aaceab726995bfb362915795f0a63527a37c9dfef7c1dd'
        }
    }).then(response => response.json())
    .then(addImage)
    .catch(e => requestError(e, 'image'));

    function addImage(data) {
        let htmlContent = '';
        let random;
        const image = data.results[random = (Math.floor(Math.random() * (data.results.length)))];
        console.log(image);
        if (image) {
            htmlContent = `<figure>
                <img src="${image.urls.small}" alt="Cat">
                <figcaption>by ${image.user.name}</figcaption>
            </figure>`;
            console.log(htmlContent)
        } else {
            htmlContent = 'Unfortunately, we couldn\'t find a cat.'
        }
        console.log(htmlContent)

        elem.insertAdjacentHTML('afterbegin', htmlContent);
    }
})();
