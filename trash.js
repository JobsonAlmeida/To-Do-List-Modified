
fetch("http://localhost:3000/tasks")
    .then(resposta => resposta.json())
    .then(resposta = console.log(resposta))
    .catch(err => console.log(err))
    .finally( ()=> console.log("finally"))

  fad