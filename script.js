// ======================================
// Project Baddie Queen v3
// Block 1 - Core Setup
// ======================================

// Main Elements
const main = document.getElementById("main");
const envelope = document.getElementById("envelope");

const flap = document.querySelector(".envelope-flap");
const letter = document.querySelector(".letter");

const letterScene = document.getElementById("letterScene");
const bigLetter = document.getElementById("bigLetter");
const bigLetterFront = document.getElementById("bigLetterFront");
const bigLetterInside = document.getElementById("bigLetterInside");

// Music
const music = new Audio("dil_mein_ho_tum.mp3");
music.loop = true;
music.volume = 0;

const music2 = new Audio("gehra_hua_tu_meri_jann.mp3");
music2.loop = true;
music2.volume = 0;
// Outro Music
const music3 = new Audio("Ishq_de_fanniyar.mp3");

music3.loop = true;
music3.volume = 0;
// States
let envelopeOpened = false;
let introFinished = false;
let letterOpened = false;
let currentPage = 0;
// ======================================
// Block 2 - Intro Setup
// ======================================

const intro = document.createElement("div");

intro.id = "intro";
intro.style.display = "none";

intro.innerHTML = `
<div id="introText"></div>
`;

document.body.appendChild(intro);

const introText = document.getElementById("introText");

const messages = [

"I spent hours making something just for you... ❤️",

"Not because I had to... 😘",

"But because you are really special to me... 💖",

"So before opening your gift... 💌",

"Close your eyes for a second... 👀",

"Take a deep breath... 🌸",

"And just smile... 😊"

];

let messageIndex = 0;
// ======================================
// Block 3 - Typewriter + Music
// ======================================

function typeWriter(text, callback){

    introText.innerHTML = "";

    let i = 0;

    const typing = setInterval(()=>{

        introText.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(typing);

            setTimeout(callback,1000);

        }

    },45);

}

function nextMessage(){

    if(messageIndex >= messages.length){

        introFinished = true;

        introText.innerHTML = "✨ The real surprise begins...";

        return;

    }

    typeWriter(messages[messageIndex],()=>{

        messageIndex++;

        nextMessage();

    });

}

function fadeInMusic(){

    music.play().catch(()=>{});

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.05;

        if(volume >= 1){

            volume = 1;
            clearInterval(fade);

        }

        music.volume = volume;

    },250);

}
// ======================================
// Block 4 - Envelope Opening
// ======================================

function openEnvelope(){

    if(envelopeOpened) return;

    envelopeOpened = true;

    // Open flap
    flap.style.transformOrigin = "top";
    flap.style.transition = "transform 0.8s ease";
    flap.style.transform = "rotateX(180deg)";

    // Pull letter
    setTimeout(()=>{

        letter.style.transition = "transform 1s ease";
        letter.style.transform = "translate(-50%,-110px)";

    },700);

    // Music
    setTimeout(()=>{

        fadeInMusic();

    },900);

    // Intro
    setTimeout(()=>{

        main.style.display = "none";

        intro.style.display = "flex";

        messageIndex = 0;

        nextMessage();

    },2200);

}

// Click
envelope.addEventListener("click", openEnvelope);
// ======================================
// Block 5 - Continue Button
// ======================================

// Create Button
const continueBtn = document.createElement("button");

continueBtn.id = "continueBtn";
continueBtn.innerHTML = "Continue ❤️";
continueBtn.style.display = "none";

intro.appendChild(continueBtn);

// Save Original Function
const oldNextMessage = nextMessage;

// Override
nextMessage = function(){

    if(messageIndex >= messages.length){

        introFinished = true;

        introText.innerHTML = "✨ The real surprise begins...";

        continueBtn.style.display = "block";

        return;

    }

    oldNextMessage();

};
// ======================================
// Block 6 - Black Screen + Song 2
// ======================================

// Create Black Screen
const blackScreen = document.createElement("div");

blackScreen.id = "blackScreen";

blackScreen.style.position = "fixed";
blackScreen.style.top = "0";
blackScreen.style.left = "0";
blackScreen.style.width = "100%";
blackScreen.style.height = "100%";
blackScreen.style.background = "#000";
blackScreen.style.opacity = "0";
blackScreen.style.display = "none";
blackScreen.style.transition = "opacity 1.5s";
blackScreen.style.zIndex = "9999";

document.body.appendChild(blackScreen);

function fadeOutMusic(){

    const fade = setInterval(()=>{

        music.volume -= 0.05;

        if(music.volume <= 0){

            music.volume = 0;
            music.pause();

            clearInterval(fade);

        }

    },200);

}
function fadeInMusic2(){

    music2.play().catch(()=>{});

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.05;

        if(volume >= 1){

            volume = 1;
            clearInterval(fade);

        }

        music2.volume = volume;

    },200);

}
function fadeOutMusic2(){

    const fade = setInterval(()=>{

        music2.volume -= 0.05;

        if(music2.volume <= 0){

            music2.volume = 0;
            music2.pause();

            clearInterval(fade);

        }

    },200);

}

function fadeInMusic3(){

    music3.play().catch(()=>{});

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.05;

        if(volume >= 1){

            volume = 1;

            clearInterval(fade);

        }

        music3.volume = volume;

    },200);

}

// Replace temporary button action
continueBtn.onclick = ()=>{

    intro.style.display = "none";

    blackScreen.style.display = "block";

    setTimeout(()=>{

        blackScreen.style.opacity = "1";

        fadeOutMusic();

    },50);

    setTimeout(()=>{

        fadeInMusic2();

    },1700);

    setTimeout(()=>{

        letterScene.style.display = "flex";

        bigLetter.style.transform = "scale(1)";

        blackScreen.style.opacity = "0";

    },3200);

    setTimeout(()=>{

        blackScreen.style.display = "none";

    },4500);

};
// ======================================
// Block 7 - Big Letter (Final)
// ======================================

// Letter Pages
const pages = [

`My Dearest ❤️

If there is one person
who has occupied a special place
in my heart...

it's you.

More than anyone else.

You became the first thought
behind this entire surprise...

the reason I stayed awake...

the reason I kept fixing every tiny detail...

just hoping that,
for even a few minutes,

you would smile because of something
I made only for you.

Because if there is someone
who truly deserves this effort...

it's you. ❤️`

];

// Typewriter
function typeLetter(text, element, callback){

    let i = 0;

    element.innerHTML = "";

    const typing = setInterval(()=>{

        element.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(typing);

            if(callback){
                callback();
            }

        }

    },35);

}

// Show Page
function showPage(index){

    bigLetterInside.innerHTML = `

<h2 style="text-align:center;color:#ff4f8b;">
My Dearest ❤️
</h2>

<br>

<p id="typingText"></p>

`;

    const typingText = document.getElementById("typingText");

    typeLetter(pages[index], typingText,addNextButton);

}

// Open Letter
bigLetter.addEventListener("click",()=>{

    if(letterOpened) return;

    letterOpened = true;

    bigLetterFront.style.opacity = "0";

    setTimeout(()=>{

        bigLetterFront.style.display = "none";

        bigLetterInside.style.display = "block";

        showPage(0);

    },500);

});
// ======================================
// Block 8 - Continue Reading
// ======================================

// Remaining Pages
pages.push(

`Sometimes...

I wonder if you even realize

how important you have become to me.

You are someone

I genuinely care about.

Seeing you happy

somehow makes my own day better.

And that's a feeling

I never want to lose. ❤️`,

`This little website...

isn't just HTML...

or CSS...

or JavaScript...

It's my time.

My effort.

My patience.

And countless little thoughts...

put together

just to make you smile. 🌸`,

`No matter where life takes us...

I hope you always remember

that there was someone

who truly appreciated you,

believed in you,

and wished nothing but happiness

for you. 💖`,

`Thank you...

for simply being you.

Never stop smiling.

Never stop believing in yourself.

Because...

you are far more special

than you probably realize.

❤️
and dont think its the ending 
its the beginning of our journey of being together forever in life`

);

// Continue button after typing
function addNextButton(){

    const btn = document.createElement("button");

    btn.id = "nextPageBtn";
    btn.style.marginTop = "35px";

    if(currentPage === pages.length - 1){
        btn.innerHTML = "Open Memories 📸❤️";
    }else{
        btn.innerHTML = "Continue Reading ❤️";
    }

    btn.onclick = ()=>{

    if(currentPage === pages.length - 1){

    bigLetter.style.display = "none";

    galleryScene.style.display = "block";

    currentGalleryPage = 0;

    loadGalleryPage(currentGalleryPage);

    return;
}

        currentPage++;

        showPage(currentPage);

    };

    bigLetterInside.appendChild(btn);

}// ======================================
// Block 11A - Gallery Data
// ======================================

const galleryPages = [

[
{
image:"IMG_20260223_124241_594.jpg",
caption:"The smile that makes even ordinary days feel special. ❤️"
},

{
image:"IMG_20260528_193307_224.jpg",
caption:"Some moments deserve to be remembered forever. 🌸"
}
],

[
{
image:"IMG_20260628_084357_776.jpg",
caption:"Every picture tells a story... this one tells mine. that how much lucky I am✨"
},

{
image:"IMG_20260628_084404_352.jpg",
caption:"Happiness looks a little different when you're in the frame. 💖"
}
],

[
{
image:"Beginning of Us.jpg",
caption:"Out of every memory I've collected... this will always be my favorite. ❤️∞"
}
]

];

let currentGalleryPage = 0;// ======================================
// Block 11B - Gallery UI
// ======================================

// Create Gallery Screen
const galleryScene = document.createElement("div");

galleryScene.id = "galleryScene";

galleryScene.style.display = "none";
galleryScene.style.position = "fixed";
galleryScene.style.top = "0";
galleryScene.style.left = "0";
galleryScene.style.width = "100%";
galleryScene.style.height = "100%";
galleryScene.style.background = "#090909";
galleryScene.style.zIndex = "10000";
galleryScene.style.overflowY = "auto";
galleryScene.style.padding = "30px";
galleryScene.style.boxSizing = "border-box";
galleryScene.style.textAlign = "center";

document.body.appendChild(galleryScene);

// Title
const galleryTitle = document.createElement("h1");

galleryTitle.innerHTML = "Our Memories ❤️";
galleryTitle.style.color = "#ff5c93";
galleryTitle.style.fontSize = "42px";
galleryTitle.style.marginBottom = "10px";

galleryScene.appendChild(galleryTitle);

// Subtitle
const gallerySubtitle = document.createElement("p");

gallerySubtitle.innerHTML =
"Every moment with you is my favorite memory.";

gallerySubtitle.style.color = "white";
gallerySubtitle.style.marginBottom = "40px";
gallerySubtitle.style.fontSize = "18px";

galleryScene.appendChild(gallerySubtitle);

// Photos Container
const photosContainer = document.createElement("div");

photosContainer.id = "photosContainer";

photosContainer.style.display = "flex";
photosContainer.style.justifyContent = "center";
photosContainer.style.alignItems = "center";
photosContainer.style.gap = "40px";
photosContainer.style.flexWrap = "wrap";

galleryScene.appendChild(photosContainer);

// Bottom Button
const galleryNextBtn = document.createElement("button");

galleryNextBtn.id = "galleryNextBtn";

galleryNextBtn.innerHTML = "Next ❤️";

galleryNextBtn.style.marginTop = "45px";
galleryNextBtn.style.padding = "12px 28px";
galleryNextBtn.style.fontSize = "18px";
galleryNextBtn.style.borderRadius = "30px";
galleryNextBtn.style.border = "none";
galleryNextBtn.style.cursor = "pointer";

galleryScene.appendChild(galleryNextBtn);
// ======================================
// Block 11C - Gallery Logic
// ======================================

function loadGalleryPage(pageIndex){

    photosContainer.innerHTML = "";

    const page = galleryPages[pageIndex];

    page.forEach((memory,index)=>{

        const card = document.createElement("div");

        card.style.width = page.length == 1 ? "260px" : "170px";

        card.style.background = "#fff";
        card.style.padding = "10px";
        card.style.borderRadius = "12px";
        card.style.boxShadow = "0 10px 25px rgba(0,0,0,.4)";

        // Tilt
        if(page.length == 2){

            card.style.transform =
            index == 0 ? "rotate(-8deg)" : "rotate(8deg)";

        }

        const img = document.createElement("img");

        img.src = memory.image;

        img.style.width = "100%";
        img.style.borderRadius = "8px";

        const caption = document.createElement("p");

        caption.innerHTML = memory.caption;

        caption.style.color = "#333";
        caption.style.marginTop = "12px";
        caption.style.fontWeight = "500";

        card.appendChild(img);
        card.appendChild(caption);

        photosContainer.appendChild(card);

    });

}// ======================================
// Block 11D - Gallery Navigation
// ======================================

galleryNextBtn.onclick = ()=>{

    // Last Gallery Page
    if(currentGalleryPage === galleryPages.length - 1){

        galleryScene.style.display = "none";

        fadeOutMusic2();

        setTimeout(()=>{

            fadeInMusic3();

        },1200);

        startOutro();

        return;

    }

    currentGalleryPage++;

    loadGalleryPage(currentGalleryPage);

    // Last page button text
    if(currentGalleryPage === galleryPages.length - 1){

        galleryNextBtn.innerHTML = "Continue ❤️";

    }else{

        galleryNextBtn.innerHTML = "Next ❤️";

    }

};// ======================================
// Block 12A - Outro Scene
// ======================================

// Outro Screen
const outroScene = document.createElement("div");

outroScene.id = "outroScene";

outroScene.style.display = "none";
outroScene.style.position = "fixed";
outroScene.style.top = "0";
outroScene.style.left = "0";
outroScene.style.width = "100%";
outroScene.style.height = "100%";
outroScene.style.background = "black";
outroScene.style.zIndex = "20000";
outroScene.style.overflow = "hidden";
outroScene.style.justifyContent = "center";
outroScene.style.alignItems = "center";
outroScene.style.flexDirection = "column";

document.body.appendChild(outroScene);

// Stars
for(let i=0;i<120;i++){

    const star = document.createElement("div");

    star.style.position = "absolute";

    star.style.width = "2px";
    star.style.height = "2px";

    star.style.borderRadius = "50%";

    star.style.background = "white";

    star.style.left = Math.random()*100+"%";
    star.style.top = Math.random()*100+"%";

    star.style.opacity = Math.random();

    outroScene.appendChild(star);

}

// Main Text
const outroText = document.createElement("div");

outroText.id = "outroText";

outroText.style.color = "white";
outroText.style.fontSize = "30px";
outroText.style.textAlign = "center";
outroText.style.padding = "30px";
outroText.style.maxWidth = "700px";
outroText.style.lineHeight = "1.8";

outroScene.appendChild(outroText);function startOutro(){

    outroScene.style.display = "flex";

}// ======================================
// Block 12B - Outro Messages
// ======================================

const outroMessages = [

"I don't know...",

"what tomorrow has planned for us...",

"But I do know one thing...",

"Meeting you...",

"was one of the most beautiful things\nthat ever happened to me.",

"Thank you...",

"For every smile...",

"For every memory...",

"And for simply being you. ❤️"

];

let outroIndex = 0;

// Typewriter
function typeOutro(text, callback){

    outroText.innerHTML = "";

    outroText.style.opacity = "1";

    let i = 0;

    const typing = setInterval(()=>{

        if(text.charAt(i) == "\n"){

            outroText.innerHTML += "<br>";

        }else{

            outroText.innerHTML += text.charAt(i);

        }

        i++;

        if(i >= text.length){

            clearInterval(typing);

            setTimeout(callback,2500);

        }

    },55);

}

// Show Next Message
function nextOutro(){

    // Finished
    if(outroIndex >= outroMessages.length){

        startFinalEnding();

        return;

    }

    typeOutro(outroMessages[outroIndex],()=>{

        // Last message stays forever
        if(outroIndex === outroMessages.length - 1){

            setTimeout(()=>{

                startFinalEnding();

            },3500);

            return;

        }

        // Fade Out
        outroText.style.transition = "opacity 1.5s";

        outroText.style.opacity = "0";

        setTimeout(()=>{

            outroIndex++;

            nextOutro();

        },1700);

    });

}

// Override Start Outro
function startOutro(){

    outroScene.style.display = "flex";

    outroIndex = 0;

    nextOutro();

}// ======================================
// Block 12C - Final Ending
// ======================================

// Final Ending
function startFinalEnding(){

    // Hide last outro message
    outroText.style.opacity = "0";

    setTimeout(()=>{

        outroText.innerHTML = `
        <div style="font-size:65px;">❤️</div>

        <div style="margin-top:30px;font-size:42px;">
            The End...
        </div>

        <div style="margin-top:20px;font-size:26px;opacity:.9;">
            or maybe...
        </div>

        <div style="margin-top:20px;font-size:36px;color:#ff8fb1;">
            just the beginning.
        </div>

        <div style="
            margin-top:45px;
            font-size:60px;
            color:#ffffff;
            animation:pulseInfinity 2.5s infinite;
        ">
            ∞
        </div>
        `;

        outroText.style.opacity = "1";

    },1500);

}

// Infinity Animation
const style = document.createElement("style");

style.innerHTML = `

@keyframes pulseInfinity{

0%{
transform:scale(1);
opacity:.5;
}

50%{
transform:scale(1.18);
opacity:1;
}

100%{
transform:scale(1);
opacity:.5;
}

}

`;

document.head.appendChild(style);
