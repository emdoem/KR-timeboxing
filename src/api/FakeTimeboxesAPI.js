import {v4 as uuidv4} from "uuid";


function wait(ms=1000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}
const timeboxes = [
    { id: 1, title: "Uczę się list", totalTimeInMinutes: 25 },
    { id: 2, title: "Uczę się formularzy", totalTimeInMinutes: 15 },
    { id: 3, title: "Uczę się srutututu", totalTimeInMinutes: 5 },
    { id: 4, title: "Uczę się życia", totalTimeInMinutes: 2 }
];
function findIndexById(id) {
    const result = timeboxes.findIndex((timebox) => timebox.id == id);
    if (result < 0) {
        throw new Error("Timebox o podanym id nie istnieje");
    }
    return result;
}
const FakeTimeboxesAPI = {
    getAllTimeboxes: async function() {
        await wait(2000);
        // console.log(timeboxes);
        return [...timeboxes];
    },
    addTimebox: async function(timeboxToAdd) {
        await wait(1000);
        const addedTimebox = {...timeboxToAdd, id: uuidv4()}
        timeboxes.push(addedTimebox);
        // console.log(timeboxes);
        return addedTimebox;
    },
    replaceTimebox: async function(timeboxToReplace) {
        await wait(1000);
        if (!timeboxToReplace.id) {
            throw new Error("Cannot replace timebox without an id")
        }
        const index = findIndexById(timeboxToReplace.id);
        const replacedTimebox = {...timeboxToReplace};
        // console.log(timeboxes);
        return replacedTimebox;
    },
    /*
    partiallyReplaceTimebox: async function(timeboxToReplace) {
        await wait(1000);
        if (!timeboxToReplace.id) {
            throw new Error("Cannot replace timebox without an id")
        }
        const index = findIndexById(timeboxToReplace.id);
        for (property in timeboxToReplace) {

        }
    },
    */
    removeTimebox: async function(timeboxToRemove) {
        await wait(1000);
        if (!timeboxToRemove.id) {
            throw new Error("Cannot remove timebox without an id")
        }
        const index = findIndexById(timeboxToRemove.id);
        // console.log(timeboxes);
        timeboxes.splice(index, 1);
    }
}

export default FakeTimeboxesAPI;