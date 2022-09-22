const quoteBtn = document.getElementById('quote-btn');
const copyBtn = document.getElementById('copy-btn');
const speechBtn = document.getElementById('speech-btn');
const cancelBtn = document.getElementById('cancel-btn');

const twitterBtn = document.getElementById('twitter-btn');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const copyAlert = document.getElementById('copy-alert');
const colorBtn = document.getElementById('colorBtn');


quoteBtn.addEventListener('click',()=>{
     
    quoteBtn.classList.add("loading");
     
    quoteBtn.innerText = "Loading Quote...";
     
     
    fetch('https://type.fit/api/quotes')
    .then(res => res.json())
    .then(data =>{
   color();
    let ranNum= randomNumber();
   

         quoteText.innerHTML=`<i class="fas fa-quote-left"></i>${ data[ranNum].text }<i class="fas fa-quote-right"></i>`
         quoteAuthor.innerHTML=`<i class="fas fa-pencil-alt"></i>${theAuthor()}`
         quoteBtn.classList.remove("loading");
         quoteBtn.innerText = "New Quote";
   

       function theAuthor(){
   if(data[ranNum].author == null){
     return  'Unknown'
  }else{
    return  data[ranNum].author
  }
     }  


    function randomNumber(){
    var randomNum =parseInt(Math.floor(Math.random()*1643)+1);
    return randomNum;
}

 })
   
})




speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${quoteAuthor.innerText}`);
         speechSynthesis.speak(utterance);
       
    }
});

cancelBtn.addEventListener("click", ()=>{
   speechCancel()
});

function speechCancel(){
     if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${quoteAuthor.innerText}`);
         speechSynthesis.cancel(utterance);
  
    }
}


copyBtn.addEventListener("click", ()=>{
    

    copyAlert.style.display='block'
    setTimeout(function(){ copyAlert.style.display='none'},1000)
    navigator.clipboard.writeText(quoteText.innerText);
});


twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const alphaNum = ['a','b','c','d','e','f',0,1,2,3,4,5,6,7,8,9];

function randomAlphaNum(){
var x = Math.floor(Math.random()*alphaNum.length);
return x;
}


function color(){
    var A = alphaNum[randomAlphaNum()];
    var B = alphaNum[randomAlphaNum()] ;
    var C = alphaNum[randomAlphaNum()];
    var D = alphaNum[randomAlphaNum()];
    var E = alphaNum[randomAlphaNum()];
    var F = alphaNum[randomAlphaNum()];

var hexCode = '#' +A + B + C + D + E + F;

document.body.style.backgroundColor= hexCode;
}

colorBtn.onclick=()=>{
    color();
}