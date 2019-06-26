'use strict';
{
    const words = [
        'STARBUCKS COFFEE', 
        'Drip Coffee', 
        'Starbucks Latte', 
        'SAKURA Blossom Cream Latte', 
        'Coffe Americano', 
        'Soy Latte',
        'Coffe Mocha',
        'White Mocha',
        'Caramel Macchiato',
        'Cappuccino',
        'Chai Tea Latte',
        'Matcha Tea Latte',
        'Dark Mocha Chip Frappuccino',
        'Caramel Frappuccino',
        'Coffee Frappuccino',
        'Matcha Frappuccino',
        'Vanilla Frappuccino',
        'Mango Passion Tea Frappuccino',
        'STRAWBERRYVERYMUCHFRAPPUCCINO',
        'Short Tall Grande Venti',
        'Hot / Iced',
        'Extra Caramel Sauce',
    ];

    // ゲームの度に、単語をシャッフルして表示

    function shuffle() {
        for (let lastWord = words.length - 1; lastWord > 0; lastWord--) {
          const num = Math.floor(Math.random() * (lastWord + 1));
          [words[num], words[lastWord]] = [words[lastWord], words[num]];
        }
        return words;
      }

    const target = document.getElementById('target');
    const awesomeLabel = document.getElementById('awesome');
    const missLabel = document.getElementById('miss');
    
    let i = 0;
    let wordContent = [];

    shuffle();
    createWord();

    function createWord() {
            wordContent = words[i].split('').map(function(value) {
            
            const span = document.createElement('span');
            span.textContent = value;
            if(words[i].length > 20) {
                span.classList.add('smaller');
            }
            if(words[i] === 'STRAWBERRYVERYMUCHFRAPPUCCINO'||
               words[i] === 'SAKURA Blossom Cream Latte') {
                span.classList.add('lovely');
            }
            target.appendChild(span);
   
            return span;
        });
    }

    
    window.addEventListener('keyup', e => {
            if (e.key === wordContent[0].textContent) {
                if(wordContent[0].textContent === ' ') {
                    wordContent[0].textContent = '★';
                    wordContent[0].classList.add('star');
                    wordContent.shift();
                }else {
                    wordContent[0].classList.add('correct');
                    wordContent.shift();
                }
            }

            if(!wordContent.length) {
                if(i < words.length - 1) {
                    target.textContent = '';
                    i++;
                    createWord();
                }else {
                    window.alert('★Awesome★');
                }
                
            }
    });
}