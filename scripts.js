let nome = "";
let statusCode = 0;
let mensagens;
let novasMensagens;

function entrarNaSala(){
    nome = prompt("Digite seu nome");

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
    {name: `${nome}`})

    promise.then(quandoSucessoEntrar);
    promise.catch(quandoErroEntrar);
}


function quandoSucessoEntrar(response) {
    alert(`${nome} bem vindo ao chat`);
    setInterval(manterUsuarioLogado, 4000);
  }
  
  function quandoErroEntrar(erro) {
    statusCode = erro.response.status;
    console.log(statusCode);

    if(statusCode === 400){
       alert("Usuário já existe, tente outro.")
       entrarNaSala();
    }
    else if(statusCode === 200){
        alert("Usuário ok");
    }
  }


function manterUsuarioLogado(){
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",
    {name: `${nome}`})
}

function adicionaMensagemChat(perfil){

}

function carregarChat(){
  promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  promise.then(carregarMensagens)
}

function carregarMensagens(mensagens){

  if(novasMensagens === undefined){
    novasMensagens = mensagens.data;
  }else{
    for(let i=0; i<mensagens.length;i++){
      console.log("teste");
    }
  }

  console.log(novasMensagens);
}


  //entrarNaSala();
  setInterval(carregarChat, 3000);
  //carregarChat();
  