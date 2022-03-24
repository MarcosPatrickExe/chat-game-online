/* ARQUIVO DESTINADO SOMENTE PARA O TRATAMENTO
DOS SOCKETs DOS CLIENTES  */

import {io} from './http.js';

let mensagens = [];
let usuarios = [];

io.on('connection', socket =>{// Escutando o evento 'connection' criado pelo socket advindo do cliente
   // console.log("Novo cliente conectado!!!  ID: "+socket.id);

      socket.on("entrou", usuario =>{
    //      console.log("dados recebidos: ");
          console.log(JSON.stringify(usuario, undefined, 4));
          usuarios.push(usuario);
          
      //  Pegando mensagens da mesma sala do usuario/socket
          const msg_da_sala =  mensagens.filter( (prev_message) => usuario.sala == prev_message.sala);
          socket.emit("verMensagensAnteriores", msg_da_sala);
      });

      socket.on("mensagemEnviada", obj =>{
          mensagens.push(obj);
        //  console.log("mensagem:  // "+obj.mensagem);
        //  console.log("mensagemlength:  "+mensagens.length);

          socket.broadcast.emit("novaMensagem", obj);//Envia para todos os sockets, menos para aquele que instigou o broadcast
          socket.emit("novaMensagem", obj);//Envia para o socket que enviou a própria mensagem para que seja renderizada
      });


      socket.on('disconnect', (usuario_saiu)=>{
  //      console.log(typeof socket.id);
    
          let i=0;
          let index;
          for( let user of usuarios){

              if(usuario_saiu.id == user.id) {
                console.log(`O usuario ${user.nome} saiu da sala ${user.sala}`);
                index = i;
                break;
              }

              i++;
          }

          usuarios.splice(index, 1);
      });
  /*  socket.on("mensagem", message=>{
        mensagens.push(message);
    }); */
});
