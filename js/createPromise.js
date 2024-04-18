export function createPromise(method, url, data = null){
    
    const promise =  new Promise(function(resolve, reject){

    const xhr = new XMLHttpRequest()

    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    xhr.send(data)

    //Eu preciso ficar monitorando um evento que é disparado sempre que o status da requisição muda. 
    //E esse evento é onreadystatechange
    xhr.onreadystatechange = verificaAjax

    function verificaAjax(){        
        if(xhr.readyState === 4){            
            if(xhr.status < 400){        
                const json = JSON.parse(xhr.responseText)                
                resolve(json)
            }
            else{
                reject(Error("algo deu errado com a conexão"))
            }
        }
    }

    })

    console.log(promise)

    return promise

}