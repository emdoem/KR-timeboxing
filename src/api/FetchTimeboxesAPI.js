import makeRequest from "./makeFetchRequest";

function createTimeboxesAPI(baseUrl = "http://localhost:4000/timeboxes/") {
    const BASE_URL = baseUrl;
    const FetchTimeboxesAPI = {
        getAllTimeboxes: async function(accessToken) {
            const response = await makeRequest(
                BASE_URL,
                "GET",
                null,
                accessToken
            )        
            const timeboxes = await response.json();
            return timeboxes;
        },
        addTimebox: async function(timeboxToAdd, accessToken) {
            const response = await makeRequest(
                BASE_URL, 
                "POST", 
                timeboxToAdd,
                accessToken
            )        
            const addedTimebox = await response.json();
            return addedTimebox;
        },
        replaceTimebox: async function(timeboxToReplace, accessToken) {
            if (!timeboxToReplace.id) {
                throw new Error("Timebox has to have and id to be updated!");
            }
            const response = await makeRequest(
                `${BASE_URL}${timeboxToReplace.id}`, 
                "PUT", 
                timeboxToReplace,
                accessToken
            )
            const replacedTimebox = await response.json();
            return replacedTimebox;
        },
        removeTimebox: async function(timeboxToRemove, accessToken) {
            if (!timeboxToRemove.id) {
                throw new Error("Timebox has to have and id to be updated!");
            }
            await makeRequest(
                BASE_URL + timeboxToRemove.id, 
                "DELETE",
                null,
                accessToken
            )
                
        }
    }
    return FetchTimeboxesAPI;
}

export default createTimeboxesAPI;

