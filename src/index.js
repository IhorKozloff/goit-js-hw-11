import './css/styles.css';
import imgSample from './sample'
import imageFinder from './myAPIService'



const refs = {
    formEl: document.querySelector('.search-form'),
    btnEl: document.querySelector('button'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
}
console.log(refs.galleryEl)

// largeImageURL - ссылка на большое изображение.

const imageAPI = new imageFinder;




 function frontEndMAker (murkUp) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imgSample(murkUp));
    console.log(murkUp)
 };



function onSubmitForm (event) {
    event.preventDefault();
    refs.galleryEl.innerHTML = '';
    imageAPI.userRequestValue = event.target.elements.searchQuery.value;
    imageAPI.searchRequest().then(frontEndMAker);
    refs.loadMoreBtnEl.classList.add('active');
};
function onLoadMoreBtn () {
    imageAPI.loadMore().then(frontEndMAker);
};
refs.formEl.addEventListener('submit', onSubmitForm);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtn)