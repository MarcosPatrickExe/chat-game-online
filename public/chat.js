const socket = io();//Essa instancia executa o evento "connection" do io.on() no server
// io("http://localhost:3000"); // poderia ser io("");
// A instancia io() automaticamente cria um novo socket no backend, chamando o evento "connection"

console.dir(socket);

const urlSearch = new URLSearchParams(
        window.location.search
); 
// Objeto global que permite acessar os dados da URL

const nome = urlSearch.get("nome");
const sala = urlSearch.get("sala");

$(`#title`).append(`Chat (${nome}) - sala ${sala}`);

console.log(`${nome} //// ${sala}`);

socket.emit("entrou", { 
    id: socket.id,
    nome, 
    sala
});

socket.on("verMensagensAnteriores", function( messages ){ 
      //console.log("atualizar mensagens: "+messages);
      enviarMensagem( messages );
});



socket.on("novaMensagem", function( message ){
   // console.log("nova mensagen: "+message);

   if(message.sala == sala)
         enviarMensagem( [message] );
});


function enviarMensagem( mensagens ){
    mensagens.forEach( (ms)=>{

        $('#chat-space').append(`
             <h4 id="list-item-1">
                ${ms.nome}:
                <span class="mensage-user">
                        ${ms.mensagem}
                </span>
             </h4>
        `);

    });
}




$('#enviar').on("click", function(event){
    //  event.preventDefault();
        
    const mensagem = $('#message-space').val();

    if( mensagem.length ){ 
      
        socket.emit("mensagemEnviada", { 
                nome, 
                mensagem,
                sala
        });

        $('#message-space').val("");// OU $('input[name=message-space]').val()
        $('#alert-msg-vazia').css({"visibility":"hidden"});

    // enviarMensagem( [{ nome,  mensagem }] );
    }else{
        $('#alert-msg-vazia').css({"visibility":"visible"});
    }

});



$('#sair').on("click", function(event){

    socket.emit("disconnect", { id : socket.id });
});
   

