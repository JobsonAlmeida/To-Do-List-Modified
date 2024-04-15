export function createXMLHttpRequest(method, url, cb, data = null){

    const xhr = new XMLHttpRequest()

    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    xhr.send(data)
    console.log(data)

    //Eu preciso ficar monitorando um evento que é disparado sempre que o status da requisição muda. 
    //E esse evento é onreadystatechange
    xhr.onreadystatechange = verificaAjax

    function verificaAjax(){
        
        if(xhr.readyState === 4 ){

            
            if(xhr.status < 400){
        
                console.log(xhr.responseText)
                console.log(xhr)
                const json = JSON.parse(xhr.responseText)
                console.log(json)
                
                if(typeof cb === "function"){
                    cb(json)
                }
            }
            else if(typeof cb === "function"){

                cb({
                    error: true,
                    status: xhr.status,
                    message: "algo deu errado com a conexão",
                    obj: xhr
                })

            }
        }
       

    }

    //verificaAjax é executada sempre que houver uma alteração no status da conexão xhr

}