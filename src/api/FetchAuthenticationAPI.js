import makeRequest from "./makeFetchRequest";

const BASE_URL = "http://localhost:5000/";

const FetchAuthenticationAPI = {
    login: async function(credentials) {
        const response = await makeRequest(
            BASE_URL + "login", 
            "POST", 
            credentials
        )        
        const result = await response.json();
        return result;
    }
}

export default FetchAuthenticationAPI;

