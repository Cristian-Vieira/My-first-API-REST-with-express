const express = require("express");
const cors = require('cors');
const app = express(); 
app.use(cors()); // Middleware para permitir solicitações de diferentes domínios
app.use(express.json()); // Middleware para fazer o parse do corpo das solicitações com formato JSON


let chillies = []; // Esta array representa o que seria o banco de dados neste prototipo
let count = 0;

 // Endpoint GET que retorna todos os elementos da array
app.get("/chillies", (req, res) => {
  res.send(chillies);
  console.log("get all chillies");
});

 // Endpoint GET que retorna um elemento especifico da array
app.get("/chillies/:id", (req, res) => {

  let chilliMatch = chillies.findIndex((chilliesArr) => chilliesArr.id == req.params.id);

  if (chilliMatch) {
    res.send(chillies[chilliMatch]);
  } else {
    res.sendStatus(400);
  }

});

 // Endpoint POST para adicionar um novo elemento para a array
app.post("/chillies", (req, res) => {

  console.log("add a chilli");
  const newChilli = { id: count, ...req.body }
  count += 1;
  chillies.push(newChilli);
  res.send(newChilli);

});

 // Endpoint PUT/UPDATE para atualizar um elemento
app.put("/chillies/:id", (req, res) => {

  console.log(`update a chilli with id ${req.params.id}`);
  // compara o id da requisição com os ids que estão na array caso contenha o id armazena o mesmo, caso não encontre retorna o valor -1
  let chilliIndex = chillies.findIndex((chilliesArr) => chilliesArr.id == req.params.id)

  if (chilliIndex != -1) {
    chillies[chilliIndex] = req.body;
    console.log(req.body);
    res.send(chillies[chilliIndex]);
  } else {
    res.sendStatus(400);
  }

});

 // Endpoint DELETE excluir um elemento
app.delete("/chillies/:id", (req, res) => {
  console.log(`delete a chilli with id ${req.params.id}`);

  let deletedChilli = chillies.find((chilliesArr) => chilliesArr.id == req.params.id);

  if (!deletedChilli) { // caso não encontre o id
    res.sendStatus(400);
  } else { // caso encontre reatribui a array usando filter
    // usamoso filter para reatribuir todos os valores da array que possuam o valor 'id' diferente do id da requisição de delete
    chillies = chillies.filter((chilliesArr) => chilliesArr.id != req.params.id);
    res.send(deletedChilli);
  }

});

 // Endpoint que ira tratar qualquer solicitações de endpoints não definidos
app.all("/", (req, res) => {
  // qualquer solicitação que não bater com nenhum endpoint retorna erro 404
  res.sendStatus("404");
});

 // Start no server, escutando na porta 3001
app.listen(3001, () => {
  console.log("listening on port 3001");
});