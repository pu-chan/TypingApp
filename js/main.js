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

    // 定数, 変数
    const target = document.getElementById('target');
    const order = document.getElementById('order');
    const timer = document.getElementById('timer');
    
    let i = 0;
    let wordContent = [];
    const timeLimit = 100 * 1000;
    let startTime;
    let isPlaying = false;

    order.textContent = '22 ';
    timer.textContent = '100.00';


    // ゲームスタート前
    target.textContent = 'click to start';


    // 単語の表示
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

    // タイマー
    function updateTime() {
       const timeLeft = startTime + timeLimit - Date.now(); 
       timer.textContent = (timeLeft / 1000).toFixed(2); 

       const timeoutId = setTimeout(() => {
            updateTime();
       }, 10);

       if(timeLeft < 0) {
           isPlaying = false;
           clearTimeout(timeoutId);
           setTimeout(()=> {
               alert('Finish★');
            }, 100);
            
           timer.textContent = '0.00';
           target.textContent = 'click to replay';
       }
    }

    // タイピング
    window.addEventListener('keyup', e => {
        if(!isPlaying) {
            return;
         }
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
                isPlaying = false;
                clearTimeout(timeoutId);
                setTimeout(()=> {
                alert('Awesome');
                }, 100);
            
                timer.textContent = '0.00';
                target.textContent = 'click to replay';
            }
        }
    });

    // 画面をクリックしてスタート
    document.addEventListener('click', () => {
        if(isPlaying) {
            return;
        }
        isPlaying = true;

        target.textContent = '';
        startTime = Date.now();
        shuffle();
        createWord();
        updateTime();
    });

    // スタイル
    const img = document.querySelector('img');
    img.src = 'img/icon01.png';

    img.addEventListener('mouseover', () => {
        img.src = 'img/icon02.png';
    });

    img.addEventListener('mouseout', () => {
        img.src = 'img/icon01.png';
    });
}