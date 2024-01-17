let db = firebase.firestore();
let auth = firebase.auth();

function switchBg(bg) {
    var images = {
        'bg.jpg': 'Joakim Honkasalo',
    };

    if (bg) {
        var randomImage = bg;
        var photographer = images[bg];
    } else {
        var keys = Object.keys(images);
        var randomImage = keys[Math.floor(Math.random() * keys.length)];
        var photographer = images[randomImage];
    }
    

    var body = document.getElementById('body');
    body.style.backgroundImage = 'url(/assets/img/index/' + randomImage + ')';

    var citation = document.getElementById('photo-citation')
    citation.innerHTML = 'Photo by ' + photographer + ' on <a href="https://unsplash.com" style="text-decoration: underline;">Unsplash</a>';
    citation.style.cursor = 'pointer';

    var aTag = citation.querySelector('a');
    aTag.style.color = 'gray';
    aTag.style.transition = 'color 0.3s';
    aTag.addEventListener('mouseover', function () {
        aTag.style.color = 'white';
    });
    aTag.addEventListener('mouseout', function () {
        aTag.style.color = 'gray';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    switchBg('bg.jpg')

    var isMobile = /iPhone|iPad|iPod|Android|Windows Phone/i.test(navigator.userAgent);
    if (isMobile) {
        
    } else {
        console.log("This is not a mobile device");
    }
});