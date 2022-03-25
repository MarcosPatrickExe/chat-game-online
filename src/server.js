import { serverHttp } from './http.js';
//require('websocket');// importando o socket que foi inicializado no server
import './websocket.js';

const PORT = process.env.PORT || 3000; // A variavel de ambiente "PORT" é definida pelo servidor de hospedagem

serverHttp.listen(3000, ()=>{
    console.log("Server is running on PORT 3000");
});

//https://www.bing.com/videos/search?q=jogos+para+fazer+com+websocket&&view=detail&mid=9C6C622132B882879CAB9C6C622132B882879CAB&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Djogos%2Bpara%2Bfazer%2Bcom%2Bwebsocket%26FORM%3DHDRSC3

//https://www.bing.com/videos/search?q=websocket&&view=detail&mid=6763A9447B66A9BF5FEC6763A9447B66A9BF5FEC&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Dwebsocket%26FORM%3DHDRSC3



// Solve - __dirname is not defined in ES module scope in JS:
//https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope