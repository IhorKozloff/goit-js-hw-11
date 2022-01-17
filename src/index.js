import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import imgSample from './templates/sample'
import imageFinder from './myAPIService'


const lightbox = new SimpleLightbox('.gallery a');
const imageAPI = new imageFinder;

const refs = {
    formEl: document.querySelector('.search-form'),
    btnEl: document.querySelector('button'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    gallerySectionEl: document.querySelector('.gallery-section'),
    scrollEl: document.querySelector('.back-home-btn'),
}

function frontEndMAker (dataToMurkUp) {
     
    refs.galleryEl.insertAdjacentHTML('beforeend', imgSample(dataToMurkUp));
    lightbox.refresh();

};


async function onSubmitForm (event) {
    event.preventDefault();
    refs.gallerySectionEl.classList.remove('error');
    refs.galleryEl.innerHTML = '';

    imageAPI.userRequestValue = event.target.elements.searchQuery.value;

    try { 
        const responseFromApi = await imageAPI.searchRequest()
        
        const {itemArr, totalItem} = responseFromApi;    

        if (itemArr.length === 0) {
                throw new Error();
            }

        Notiflix.Notify.success(`Hooray! We found ${totalItem} images.`);
        frontEndMAker(itemArr);
        refs.loadMoreBtnEl.classList.add('active');

    } catch {
        onSearchError();
    }

};

async function onLoadMoreBtn () {

    try { 
        const responseFromApi = await imageAPI.loadMore()      


        if (responseFromApi.length === 0) {
                throw new Error();
            }

        frontEndMAker(responseFromApi);
        
    } catch {
        inTheEeeeeeend();
    }
    
};










function onSearchError () {
    refs.galleryEl.innerHTML = '';
    refs.loadMoreBtnEl.classList.remove('active');
    refs.gallerySectionEl.classList.add('error');
    
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
function inTheEeeeeeend () {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtnEl.classList.remove('active');
};





function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        refs.scrollEl.classList.add('active');
    }
    if (scrolled < coords) {
        refs.scrollEl.classList.remove('active');
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
}



refs.formEl.addEventListener('submit', onSubmitForm);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtn)
window.addEventListener('scroll', trackScroll);
refs.scrollEl.addEventListener('click', backToTop);




