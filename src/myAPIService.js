const PIXABAY_API_KEY = 'key=25226390-6524195878b00f535edfb636d';
const URL = 'https://pixabay.com/api/';
const axios = require('axios').default;
export default class ImageAPIService {
    constructor () {
        
        this.imageType = `image_type=photo`;
        this.orientation = `orientation=horizontal`;
        this.safesearch = `safesearch=true`;
        this.indexOfPage = 1;
        this.userSearchRequest = "";
        this.pictureRequest = `q=${this.userSearchRequest}`;
        
    }
        
    async searchRequest () {

        this.indexOfPage = 1;  
        
        try {
            const response = await axios.get(`${URL}?${PIXABAY_API_KEY}&${this.pictureRequest}&${this.imageType}&${this.orientation}&${this.safesearch}&per_page=40&page=${this.indexOfPage}`);               
                
            const resultData = {
                itemArr: response.data.hits, 
                totalItem: response.data.totalHits,
            }; 
            return resultData;
        
            
        } 
        catch (error) {
            console.error(error);
            return error
        } 

    };

    async loadMore () {

        this.indexOfPage += 1;         
        
        try {
            const response = await axios.get(`${URL}?${PIXABAY_API_KEY}&${this.pictureRequest}&${this.imageType}&${this.orientation}&${this.safesearch}&per_page=40&page=${this.indexOfPage}`);               
              
            return response.data.hits;  
        } 
        catch (error) {
            return error
        }

    }
    
    get userRequestValue() {
        return this.userSearchRequest;
    }
    set userRequestValue(request) {
        this.userSearchRequest = request;
    }
}
