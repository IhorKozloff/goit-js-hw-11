import './css/styles.css';
import imgSample from './sample'
const PIXABAY_API_KEY = 'key=25226390-6524195878b00f535edfb636d';
const URL = 'https://pixabay.com/api/';
const refs = {
    formEl: document.querySelector('.search-form'),
    btnEl: document.querySelector('button'),
    galleryEl: document.querySelector('.gallery'),
}
console.log(refs.galleryEl)
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.



function getServer (searchRequest) {
    const searchTerm = `q=${searchRequest}`;
    const imageType = `image_type=photo`;
    const orientation = `orientation=horizontal`;
    const safesearch = `safesearch=true`;

 return fetch(`${URL}?${PIXABAY_API_KEY}&${searchTerm}&${imageType}&${orientation}&${safesearch}`).then(response => {
    return response.json();
 }).then(result => {
    return result.hits;
});
 };

 function frontEndMAker (workFront) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imgSample(workFront));
    console.log(workFront)
 };



function onSubmitForm (event) {
    event.preventDefault();

    const userSearchRequest = event.target.elements.searchQuery.value

    getServer(userSearchRequest).then(frontEndMAker);
};
refs.formEl.addEventListener('submit', onSubmitForm);