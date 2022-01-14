import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import imgSample from './templates/sample'
import imageFinder from './myAPIService'


const lightbox = new SimpleLightbox('.gallery a', { close: "true" });

const refs = {
    formEl: document.querySelector('.search-form'),
    btnEl: document.querySelector('button'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    gallerySectionEl: document.querySelector('.gallery-section'),
    scrollEl: document.querySelector('.back-home-btn'),
}
console.log(refs.galleryEl)

// largeImageURL - ссылка на большое изображение.
const timeOut = 0;
const imageAPI = new imageFinder;




 function frontEndMAker (dataToMurkUp) {
     
    refs.galleryEl.insertAdjacentHTML('beforeend', imgSample(dataToMurkUp));

 };



function onSubmitForm (event) {
    event.preventDefault();
    refs.gallerySectionEl.classList.remove('error');
    refs.galleryEl.innerHTML = '';
    imageAPI.userRequestValue = event.target.elements.searchQuery.value;

    imageAPI.searchRequest().then(searchResult => {

       const {itemArr, totalItem} = searchResult;
  
        if (itemArr.length === 0) {
            throw new Error();
        }
        
        Notiflix.Notify.success(`Hooray! We found ${totalItem} images.`);

        frontEndMAker(itemArr);

        refs.loadMoreBtnEl.classList.add('active');

    }).catch(onSearchError);
    
};
function onLoadMoreBtn () {
    imageAPI.loadMore().then(onMoresearchResult => {

  
        if (onMoresearchResult.length === 0) {
            throw new Error();
        };

        frontEndMAker(onMoresearchResult);
    }).catch(inTheEeeeeeend);
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

refs.formEl.addEventListener('submit', onSubmitForm);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtn)


window.onscroll = function () {
    
    if (document.body.scrollTop > document.documentElement.clientHeight) {
        refs.scrollEl.style.opacity = "0";
    } else {
        refs.scrollEl.style.opacity = "1";
    }
    
};
function goUp () {
    const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (top > 0) {
        window.scrollBy(0, -100);
    }
};