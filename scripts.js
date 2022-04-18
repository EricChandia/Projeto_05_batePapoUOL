let nome = "";
let statusCode = 0;
let mensagens;
let novasMensagens;
let chat;

function telaInicial(){
  nome = document.querySelector(".tela-inicial-input").value;
  console.log(nome);
  entrarNaSala();
}

function entrarNaSala(){
    //nome = prompt("Digite seu nome");

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
    {name: `${nome}`})

    promise.then(quandoSucessoEntrar);
    promise.catch(quandoErroEntrar);
}


function quandoSucessoEntrar(response) {
    setInterval(manterUsuarioLogado, 4000);
    carregarChat();
    setInterval(carregarChat, 5000);

    const header = document.querySelector(".header");
    header.classList.toggle("hide");
    const main = document.querySelector(".main");
    main.classList.toggle("hide");
    const footer = document.querySelector(".footer");
    footer.classList.toggle("hide");
    const telaNome = document.querySelector(".tela-inicial");
    telaNome.classList.toggle("hide");
    telaNome.classList.toggle("display-flex");
  }
  
  function quandoErroEntrar(erro) {
    statusCode = erro.response.status;

    if(statusCode === 400){
       alert("Usuário já existe, tente outro.")
       //entrarNaSala();
    }
    else if(statusCode === 200){
        alert("Usuário ok");
    }
  }


function manterUsuarioLogado(){
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",
    {name: `${nome}`})
}

function carregarChat(){
  promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  promise.then(carregarMensagens)
}

function carregarMensagens(mensagens)
{
  mensagens = mensagens.data;
  chat = document.querySelector(".chat");
  chat.innerHTML = "";

    for(let i=0; i<mensagens.length;i++)
    {
      if(mensagens[i].type === 'status'){
        chat.innerHTML += `<li class="chatMsgEntrouNaSala"> <div class="time"> (${mensagens[i].time})&nbsp</div> <b> ${mensagens[i].from}&nbsp </b> ${mensagens[i].text}</div> </li>`
        }else if(mensagens[i].type === 'message'){
          chat.innerHTML += `<li class="chatMsgTodos"> <div class="time"> (01:59:54)&nbsp</div> <b>${mensagens[i].from}</b>&nbsppara&nbsp<b>${mensagens[i].to}:&nbsp</b>${mensagens[i].text}</li>` 
        }else if(mensagens[i].type === 'private_message'){
          if(nome != mensagens[i].name){
            chat.innerHTML += `<li class="chatMsgPrivate hide"> <div class="time"> (01:59:54)&nbsp</div> <b>${mensagens[i].from}</b>&nbsppara&nbsp<b>${mensagens[i].to}:&nbsp</b>${mensagens[i].text}</li>`
          }else{
            chat.innerHTML += `<li class="chatMsgPrivate"> <div class="time"> (01:59:54)&nbsp</div> <b>${mensagens[i].from}</b>&nbsppara&nbsp<b>${mensagens[i].to}:&nbsp</b>${mensagens[i].text}</li>`
          }
        }  
    }
  
  scrollUltimaMensagem();
}

function scrollUltimaMensagem(){
  const msgs = document.querySelectorAll("li");
  const lastMsg = msgs[99];
  lastMsg.scrollIntoView();
}

function envioComEnter(){
  var input = document.querySelector(".inputMessage");
  input.addEventListener("keydown", function (e) {
   if (e.key === "Enter") {  
     validate(e);
   }
 });
}

function validate(e) {
  adicionaMensagemChat();
}

function adicionaMensagemChat(){
  const input = document.querySelector(".inputMessage").value;
  let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", 
  {
    from: `${nome}`,
    to: "Todos",
    text: `${input}`,
    type: "message"
  });
  promise.then(carregarChat);
  promise.then(limpaInput);
  promise.catch(erroAoEnviar);
}

function limpaInput(){
  document.querySelector(".inputMessage").value = "";
}

function erroAoEnviar(erro) {
  statusCode = erro.response.status;
  alert("Erro ao enviar mensagem, usuário inativo");
  window.location.reload();
}


  envioComEnter();
  //entrarNaSala();
  //carregarChat();
  //adicionaMensagemChat();
