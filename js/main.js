'use strict';
{
    const word = 'starbacks coffee';


    const target = document.getElementById('target');
    const awesomeLabel = document.getElementById('awesome');
    const missLabel = document.getElementById('miss');

    
    let wordContent = [];
    wordContent = word.split('').map(function(value) {
         const span = document.createElement('span');
         span.textContent = value;
         target.appendChild(span);

         return span;
     });

     console.log(wordContent);
    
    window.addEventListener('keyup', e => {
            console.log(e.key);
            if (e.key === wordContent[0].textContent) {
                wordContent[0].classList.add('correct');
                wordContent.shift();
                console.log('awesome');
            }
    });
   
}