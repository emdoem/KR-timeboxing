// const BASE_URL = "http://localhost:4000/timeboxes/"



function createTimeboxesAPI(baseUrl = "http://localhost:4000/timeboxes/") {
    const BASE_URL = baseUrl;
    const FetchTimeboxesAPI = {
        getAllTimeboxes: async function() {
            const response = await makeRequest(
                BASE_URL
            )        
            const timeboxes = await response.json();
            return timeboxes;
        },
        addTimebox: async function(timeboxToAdd) {
            const response = await makeRequest(
                BASE_URL, 
                "POST", 
                timeboxToAdd
            )        
            const addedTimebox = await response.json();
            return addedTimebox;
        },
        replaceTimebox: async function(timeboxToReplace) {
            if (!timeboxToReplace.id) {
                throw new Error("Timebox has to have and id to be updated!");
            }
            const response = await makeRequest(
                `${BASE_URL}${timeboxToReplace.id}`, 
                "PUT", 
                timeboxToReplace
            )
            const replacedTimebox = await response.json();
            return replacedTimebox;
        },
        removeTimebox: async function(timeboxToRemove) {
            if (!timeboxToRemove.id) {
                throw new Error("Timebox has to have and id to be updated!");
            }
            await makeRequest(
                BASE_URL + timeboxToRemove.id, 
                "DELETE"
            )
                
        }
    }
    return FetchTimeboxesAPI;
}

export default createTimeboxesAPI;

async function makeRequest(url, method, body) {
    const jsonBody = body ? JSON.stringify(body) : undefined;
    const response = await window.fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonBody
        });
    if (!response.ok) {
        throw new Error("Sumting wong!");
    }
    return response;
}