import axios from 'axios';

function createTimeboxesAPI(baseUrl = "http://localhost:4000/timeboxes/") {
    const BASE_URL = baseUrl;
    const AxiosTimeboxesAPI = {
        getAllTimeboxes: async function() {    
            const response = await axios.get(BASE_URL);             
            const timeboxes = response.data;
            return timeboxes;
        },
        addTimebox: async function(timeboxToAdd) { 
            const response = await axios.post(BASE_URL, timeboxToAdd);             
            const addedTimebox = response.data;
            return addedTimebox;
        },
        replaceTimebox: async function(timeboxToReplace) {   
            if (!timeboxToReplace.id) {
                throw new Error("Timebox has to have and id to be updated!");
            }    
            const response = await axios.put(BASE_URL + timeboxToReplace.id, timeboxToReplace);
            const replacedTimebox = response.data;
            return replacedTimebox;
        },
        removeTimebox: async function(timeboxToRemove) {
            if (!timeboxToRemove.id) {
                throw new Error("Timebox has to have and id to be updated!");
            }
            await axios.delete(BASE_URL + timeboxToRemove.id, timeboxToRemove);
                
        }
    }
    return AxiosTimeboxesAPI;
}

export default createTimeboxesAPI;
