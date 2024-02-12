URL=`https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=API_KEY`;

var currentDate = new Date();

var year = currentDate.getFullYear(); 
var month = currentDate.getMonth() +1;  
var day = currentDate.getDate();      
var hours = currentDate.getHours();   
var minutes = currentDate.getMinutes(); 
var seconds = currentDate.getSeconds(); 
var milliseconds = currentDate.getMilliseconds();


let content=document.querySelector('.content');
let btn=document.querySelector('#showSelected');
let input=document.querySelector('#searchInput');
let lang=document.querySelector('#langSelect').value;
let date=document.querySelector('#date');

date.innerHTML=`Date: ${day}/${month}/${year}`

// function trimText(text) {
//     let words = text.split(" ");
//     let trimmedWords = words.slice(0, 16);
//     let trimmedText = trimmedWords.join(" ");
//     return trimmedText;
// }

async function getn(e)
{
    content.innerHTML='';
    let response=await fetch(e);
    let data=await response.json();
    console.log(data);
    
    if(data.totalResults===0)
    {
        content.innerHTML='<h1><center>No news in this category!</center></h1>'
    }
    
    for(i=1;i<data.totalResults;i++)
    {
        let card=document.createElement('div');
        card.className='cards';

        if(data.articles[i].urlToImage==='null')
        {
            imgSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png';
        }
        else
        {
            imgSrc=data.articles[i].urlToImage;  
        }
        card.innerHTML=`<img src=${imgSrc} alt='failed to load'/><br>
        <h1 style="font-size: large;">${data.articles[i].title}</h1><br>
        <h1 style="font-size: medium;">${data.articles[i].author}</h1><br>
        ${data.articles[i].description} .....<br>
        <br>
        <b>Published:</b> ${data.articles[i].publishedAt}
        <a href=${data.articles[i].url}>See more</a>`
        content.appendChild(card);
    }
}

btn.addEventListener('click',()=>{
    let value=input.value.toLowerCase();
    console.log(value);
    let langSelect = document.getElementById("langSelect");
    let selectedValue = langSelect.value;
    console.log(selectedValue);
    
   getn(`https://newsapi.org/v2/top-headlines?country=${value}&category=${selectedValue}&apiKey=API_KEY&pageSize=100`)
});

input.addEventListener('mouseenter',()=>{
    if(input.value==='Search news by country code')
    {
        input.value='';
    }
})

// getn(URL);








