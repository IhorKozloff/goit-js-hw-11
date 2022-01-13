export default class ImageAPIService {
    constructor () {
        this.URL = 'https://pixabay.com/api/';
        this.imageType = `image_type=photo`;
        this.orientation = `orientation=horizontal`;
        this.safesearch = `safesearch=true`;
        this.indexOfPage = 1;
        this.userSearchRequest = 1;
        this.PIXABAY_API_KEY = 'key=25226390-6524195878b00f535edfb636d';
    }
        
    searchRequest () {
        this.indexOfPage = 1;  
    return fetch(`${this.URL}?${this.PIXABAY_API_KEY}&q=${this.userSearchRequest}&${this.imageType}&${this.orientation}&${this.safesearch}&per_page=40&page=${this.indexOfPage}`).then(response => {
        return response.json();
    }).then(result => {
        return result.hits;
    });


    };
    loadMore () {
        this.indexOfPage += 1;  
        return fetch(`${this.URL}?${this.PIXABAY_API_KEY}&q=${this.userSearchRequest}&${this.imageType}&${this.orientation}&${this.safesearch}&per_page=40&page=${this.indexOfPage}`).then(response => {
            return response.json();
        }).then(result => {
            return result.hits;
        });
    }
    
    get userRequestValue() {
        return this.userSearchRequest;
    }
    set userRequestValue(request) {
        this.userSearchRequest = request;
    }
}
