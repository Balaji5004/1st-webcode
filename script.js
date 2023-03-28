var menuIcon=document.querySelector(".menu-icon");
var sidebar=document.querySelector(".sidebar")
 
menuIcon.onclick=function(){
    sidebar.classList.toggle("small-sidebar");

}

const videocardcontainer =document.querySelector('.video-container');
let api_key="AIzaSyDya90djIPYn7HIwoXNLLvkDSGBLyztViM";
let video_http="https://www.googleapis.com/youtube/v3/videos?";
let channel_http="https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
     key: api_key,
     part: 'snippet',
     chart: 'mostpopular',
     maxResult:50,
     regioncode:'IN'
}))
.then(res => res.json())
.then(data=>{
    //console.log(data);
    data.items.forEach(item =>{
        getchannelicon(item);

    })
})
.catch(err => console.log(err));

const getchannelicon =(video_data) => {
     fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
     }))
     .then(res => res.json())
     .then(data =>{
        video_data.channelThumbnail =data.items[0].snippet.thumbnails.default.url;
        makevideocard(video_data);
     })

}
 
const makevideocard =(data) => {
    videocardcontainer.innerHTML +=`
    <div class="video" onclick="location.href='https://www.youtube.com/results?search_query=guvi=${data.id}'">
    <a href="https://www.youtube.com/results?search_query=guvi" target="_blank">

    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
        <img src="${data.channelThumbnail}" class="chennal-icon" alt="">
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="chennal-name">${data.snippet.channeltitle}</p>
    
        </div>
    </div>
   </a>
</div>

    `;
}

//search bar

const searchInput = document.querySelector('search-box flex-div');
const imagessearchpng =document.querySelector('.images/search.png');
let searchlink ="https://www.youtube.com/results?search_query=";

imagessearchpng.addEventListener('click',() => {
    if(searchInput.value.length){
        location.href =searchlink + searchInput.value;
    }
})



