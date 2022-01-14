const PIXABAY_API_KEY = 'key=25226390-6524195878b00f535edfb636d';
const URL = 'https://pixabay.com/api/';

export default class ImageAPIService {
    constructor () {
        
        this.imageType = `image_type=photo`;
        this.orientation = `orientation=horizontal`;
        this.safesearch = `safesearch=true`;
        this.indexOfPage = 1;
        this.userSearchRequest = 1;
        
    }
        
    searchRequest () {

        this.indexOfPage = 1;  

        return fetch(`${URL}?${PIXABAY_API_KEY}&q=${this.userSearchRequest}&${this.imageType}&${this.orientation}&${this.safesearch}&per_page=40&page=${this.indexOfPage}`).then(response => {
            return response.json();
        }).then(result => {
            
            const resultData = {
                itemArr: result.hits, 
                totalItem: result.totalHits,
            };
            
            return resultData;
        });


    };

    loadMore () {

        this.indexOfPage += 1;  

        return fetch(`${URL}?${PIXABAY_API_KEY}&q=${this.userSearchRequest}&${this.imageType}&${this.orientation}&${this.safesearch}&per_page=40&page=${this.indexOfPage}`).then(response => {
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
