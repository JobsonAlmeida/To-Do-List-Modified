export function createXMLHttpRequest(method, url, sucess, error, data = null){

    const xhr = new XMLHttpRequest()

    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    xhr.send(data)

    //Eu preciso ficar monitorando um evento que é disparado sempre que o status da requisição muda. 
    //E esse evento é onreadystatechange
    xhr.onreadystatechange = verificaAjax

    function verificaAjax(){
        debugger
        
        if(xhr.readyState === 4 ){
            
            if(xhr.status < 400){        
                const json = JSON.parse(xhr.responseText)                
                if(typeof sucess === "function"){
                    sucess(json)
                }
            }
            else if(typeof error === "function"){
                error("Algo deu errado com a conexão")
            }
        }
       

    }

    //verificaAjax é executada sempre que houver uma alteração no status da conexão xhr

}