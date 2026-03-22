// The API Key is securely handled by our custom proxy backend.
const SOURCE_URL ='http://localhost:5000/api/tmdb/';

const main=document.querySelector('.main');
const ipage=document.querySelector('.more-info-page');
const vnav=document.querySelector('.vertical-nav');
const search_page=document.querySelector('.search-info-page');


//Left Right Scrolling
const sections = document.querySelectorAll('.section-container');

sections.forEach(section => {
    const wrapper=section.querySelector('.movie-row-wrapper');

    const rightBtn=document.createElement('button');        //right-button
    const img1=document.createElement('img');
    rightBtn.classList.add('scroll-btn','right-btn');
    img1.src="assets/right-scroll.png";
    rightBtn.appendChild(img1);
    wrapper.appendChild(rightBtn);

    const leftBtn=document.createElement('button');        //left-button
    const img2=document.createElement('img');
    leftBtn.classList.add('scroll-btn','left-btn');
    img2.src="assets/left-scroll.png";
    leftBtn.appendChild(img2);
    wrapper.appendChild(leftBtn);


    rightBtn.addEventListener('click', () => {
        wrapper.scrollBy({  // Scroll the WRAPPER, not the row
            left: 300,
            behavior: 'smooth'
        });
    });

    leftBtn.addEventListener('click', () => {
        wrapper.scrollBy({  // Scroll the WRAPPER, not the row
            left: -300,
            behavior: 'smooth'
        });
    });
});


//Navigation

const navMap={
    'nav-trending': 'trending-section',
    'nav-upcoming': 'coming-soon-section',
    'nav-home': 'hero-banner',
    'nav-tv': 'tv-airing-today-section'
}

Object.keys(navMap).forEach(navId => {
    const navItem= document.getElementById(navId);
    const sectionId= navMap[navId];
    const section=document.querySelector(`.${sectionId}`);

    navItem.addEventListener('click', ()=>{
        window.scrollTo({
            top: section.offsetTop,
            behavior:'smooth'
        });
    });
});

const search_img=document.querySelector('#nav-search-img');
const searchContainer=document.getElementById('nav-search');
const searchInput=document.getElementById('search');
let isopen=false;
search_img.addEventListener('click', ()=>{
    const main=document.querySelector('.main');
    if(isopen==false){
        isopen=true;
        searchInput.classList.add('show')
        searchInput.classList.remove('display_none')
        searchInput.focus();
        main.style.filter='blur(2px)';
        main.style.opacity='0.5';
    }
    else{
        isopen=false;
        searchInput.classList.remove('show')
        searchInput.classList.add('display_none')
        main.style.filter='none';
        main.style.opacity='1';
    }
    
});

document.addEventListener('click', (e) => {
    if (isopen && !searchContainer.contains(e.target)) {
        searchInput.classList.remove('show');
        searchInput.classList.add('display_none')
        isopen = false;
        const main=document.querySelector('.main');
        main.style.filter='none';
        main.style.opacity='1';
    }
});

searchInput.addEventListener('keydown', (e)=>{
    if(e.key=== 'Enter'){
        const search=document.getElementById('search');
        search.classList.add('display_none');
        console.log("search for:", searchInput.value);
        main.classList.add('display_none');
        ipage.classList.add('display_none');
        search_page.classList.remove('display_none');
        searchMovie(searchInput.value);
    }
})

async function searchMovie(query){
    const url = `${SOURCE_URL}search/multi?include_adult=false&query=${encodeURIComponent(query)}`;



    try{
        const response=await fetch(url);
        const data=await response.json();
        if(data.results.length>0){
            displaySearchMovies(data.results);
            const searched_text=document.getElementById('search-found-text');
        searched_text.textContent=`Search Results For: ${query}`;
        }else{
            const search_text=document.querySelector('#search-found-text');
            search_text.textContent=`Noting Found For: ${query}`;
        }
    }catch(err){
        console.log(err);
    }
}

function displaySearchMovies(data){
    const search_list=document.querySelector(".searched-movie-list");
    search_list.innerHTML='';
    

    data.forEach(res => {
        const found_text=document.getElementById('search-found-text')
        const movie_card = document.createElement('div');
        movie_card.classList.add('searched-movie-card');

        if(!res.poster_path ){
            return;
        }

        found_text.innerText=`Search Results For: ${res.title || res.name || res.original_title || res.original_name || "Untitled"}`
        
        const info = document.createElement('div');
        info.classList.add('searched-movie-info');

        const img=document.createElement('img');
        img.src=res.poster_path?`https://image.tmdb.org/t/p/original${res.poster_path}`:'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
        img.alt=res.title;

        const h1=document.createElement('h1');
        h1.textContent=res.title || res.name || res.original_title || res.original_name || "Untitled";

        info.appendChild(h1);
        movie_card.appendChild(img);
        movie_card.appendChild(info);

        movie_card.addEventListener('click', ()=>{
            more_info_page(res,'search_page');
        })

        search_list.appendChild(movie_card);
    })

    //returning back
    const back_elements=[
        document.getElementById('search-back'),
        document.getElementById('nav-home'),
        document.getElementById('nav-trending'),
        document.getElementById('nav-tv'),
        document.getElementById('nav-upcoming'),
        document.getElementById('logo-img ')
    ]
    
    back_elements.forEach(el => {
            el.addEventListener('click', ()=>{
            main.classList.remove('display_none');
            ipage.classList.add('display_none');
            search_page.classList.add('display_none');
            vnav.classList.remove('display_none');
        })
    })
    

}


//Movie Retreval


async function fetchmovies(section,section_name,type){
    try{
        const res=await fetch(`${SOURCE_URL}${type}/${section_name}`);
        const json = await res.json();
        const data = json.results;

        for(let i=0;i<10;i++){
            const movie_row=document.querySelector(`.${section} .movie-row`);
            const div= document.createElement("div");
            div.classList.add('movie-card');

            const img=document.createElement("img");
            img.src=data[i].poster_path?`https://image.tmdb.org/t/p/w500${data[i].poster_path}`:'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

            div.appendChild(img);

            const sec_div=document.createElement("div");
            sec_div.classList.add('movie-info');
            const h1=document.createElement("h1");
            const h3i=document.createElement("h3");
            const h3ii=document.createElement("h3");

            if(type=='movie'){
                h1.textContent=data[i].title;
                h3i.textContent=`Release-date: ${data[i].release_date}`;
                h3ii.textContent=`Ratings: ${data[i].vote_average}`;
            }
            else{
                h1.textContent=data[i].name;
                h3i.textContent=`Release-date: ${data[i].first_air_date}`;
                h3ii.textContent=`Ratings: ${data[i].vote_average}`;
            }

            sec_div.appendChild(h1);
            sec_div.appendChild(h3i);
            sec_div.appendChild(h3ii);
            div.appendChild(sec_div);
            movie_row.appendChild(div);

            div.addEventListener('click', ()=>{
                more_info_page(data[i],'main_page');
            })
        }

        
       
    }
    catch(err){
        console.log(err);
        const movie_row=document.querySelector(`.${section} .movie-row`);
        const div= document.createElement("div");
        div.classList.add('movie-card');
        div.textContent=err;
        div.style.margin='11rem 2rem';
        movie_row.appendChild(div);
    }
   
}

const section_names_movie={
    'top-movies-section':'top_rated',
    "trending-section":'popular',
    "new-releases-section":'now_playing',
    "coming-soon-section":'upcoming'
};
const section_names_tv={
    "tv-airing-today-section":'airing_today',
    "tv-popular-section":'popular',
    "tv-top_rated-section":'top_rated'
}

Object.keys(section_names_movie).forEach( section=>{
    fetchmovies(section,section_names_movie[section],'movie')
})

Object.keys(section_names_tv).forEach( section=>{
    fetchmovies(section,section_names_tv[section],'tv')
})


async function heroBanner(){
    try{
        let year=2025;
        let res=await fetch(`${SOURCE_URL}discover/movie?primary_release_year=${year}&sort_by=revenue.desc`);
        res= await res.json();
        const data=res.results;
        
        const track=document.querySelector('.hero-track');
        let index=0;

        data.forEach((movie)=>{
            let slide=document.createElement("div");
            slide.classList.add('hero-slide');

            slide.innerHTML=`
            <img id="banner" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}">
            <div class="banner-content">
                    <h1 class="movie-title">${movie.title}</h1>
                    <p class="movie-desc">${movie.overview}</p>
                    <button class="info-button">More Info</button>
            </div>
            `;

            track.appendChild(slide);

            const info_btns=document.querySelectorAll(".info-button");
            
            info_btns.forEach((btn,index)=>{
                btn.addEventListener('click', ()=>{
                    more_info_page(data[index],'main_page');
                })
            })
        });

        const slides=document.querySelectorAll(".hero-slide");
        slides[index].classList.add("active");

        function updateSlide(){
            track.style.transform = `translateX(-${index*71.5}%)`;
            slides.forEach(s=> s.classList.remove("active"));
            slides[index].classList.add("active");
        }

        setInterval(()=>{
            index=(index+1)% slides.length;
            updateSlide();
        },5000);

        document.querySelector(".next").addEventListener("click",()=>{
            index=(index+1)%slides.length;
            updateSlide();
        })

        document.querySelector(".prev").addEventListener("click",()=>{
            index=(index-1+slides.length) % slides.length;
            updateSlide();
        })
    }
    catch(err){
        console.log(err);
    }
}

heroBanner();


function more_info_page(movie, page){
    console.log('more-info clicked')
    

    main.classList.add('display_none');
    vnav.classList.add('display_none');
    ipage.classList.remove('display_none');
    search_page.classList.add('display_none');


    const banner=document.getElementById('info-banner');
    const info_poster=document.getElementById('info-poster');
    const info=document.querySelector('.info');
    const info_back=document.getElementById('info-back');

    banner.src=movie.poster_path?`https://image.tmdb.org/t/p/original${movie.backdrop_path}`:'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    info_poster.src=movie.poster_path?`https://image.tmdb.org/t/p/original${movie.poster_path}`:'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    info.querySelector('h1').textContent = movie.title || movie.name;
    info.querySelectorAll('h2')[0].textContent = `Release Date: ${movie.release_date || movie.first_air_date}`;
    info.querySelectorAll('h2')[1].textContent = `Rating: ${movie.vote_average}`;
    info.querySelector('p').textContent = movie.overview;

    info_back.addEventListener('click', ()=>{
        if(page=='main_page'){
            main.classList.remove('display_none');
            vnav.classList.remove('display_none');
            ipage.classList.add('display_none');
            search_page.classList.add('display_none');
        }else if(page=='search_page'){
            main.classList.add('display_none');
            vnav.classList.remove('display_none');
            ipage.classList.add('display_none');
            search_page.classList.remove('display_none');
        }

        
    })
}