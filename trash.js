// class Produto { 
//     constructor(paramNome, paramPreco){
//          this.nome = paramNome; 
//          this.preco = paramPreco;     
//     } calculaDesconto() { 
//         return this.preco * 0.1; 
//         } 
// } 
// var produto1 = new Produto("Blusa", 120);
// var produto2 = new Produto("Calça", 300);
// produto1.calculaDesconto(); //12 
// produto2.calculaDesconto(); //30

// produto1.calculaDesconto(); //12


// let arrTasks = [
//     {
//         name: "task 1",
//         completed: true,
//         createdAt: 1592667375012,
//         updatedAt: null
//     },
//     {
//         name: "task 2",
//         createdAt: 1581667345723,
//         updatedAt: 1592667325018
//     },
//     {
//         name: "task 3",
//         completed: true,
//         createdAt: 1592667355018,
//         updatedAt: 1593677457010
//     }
// ]



// var produto1 = criaProduto("Blusa", 120);
// var produto2 = criaProduto("Calça", 300); 
// produto1.calculaDesconto(); //12 
// produto2.calculaDesconto(); //30

let promise = new Promise((resolve, reject)=>{
    resolve()
})

promise
    .then(()=>{
        console.log("first")
    })
    .then(()=>{ 

       return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            console.log("second")
            resolve("dentro do resolve")
        }, 3000)
       })
        .then((data) => {
            return `${data} + ABC`
        })

    })
    .then((data)=>{
        setTimeout(()=>{
            console.log("third")
            console.log("data:", data)
        }, 1000)
    })
