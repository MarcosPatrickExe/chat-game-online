/* ARQUIVO DESTINADO SOMENTE PARA O TRATAMENTO
DOS SOCKETs DOS CLIENTES  */

import {io} from './http.js';

let mensagens = [];

io.on('connection', socket =>{// Escutando o evento 'connection' criado pelo socket advindo do cliente
   // console.log("Novo cliente conectado!!!  ID: "+socket.id);

    socket.on("entrou", (data)=>{
        console.log("dados recebidos: ");
        console.log(JSON.stringify(data,undefined, 4));
        
        socket.emit("verMensagensAnteriores", mensagens);
    });

    socket.on("mensagemEnviada", (obj)=>{
        mensagens.push(obj);
    //    console.log("mensagem:  // "+obj.mensagem);
      //  console.log("mensagemlength:  "+mensagens.length);

       
        socket.broadcast.emit("novaMensagem", obj);
    })

  /*  socket.on("mensagem", message=>{
        mensagens.push(message);
    }); */
});