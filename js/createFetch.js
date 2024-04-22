export function createFetch(method, url, data = null){

    function handleError(response){
        if(!response.ok){
            throw Error(response.status + ": " + response.statusText)
        }
        return response
    }
    
    return fetch(url)
        .then(response => handleError(response))
        .then(response => response.json())

}