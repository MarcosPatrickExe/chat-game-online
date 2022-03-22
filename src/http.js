import express from "express";
import http from "http";// from node modules
import path from "path"; // from node modules
import {Server} from "socket.io"; // Servidor do socket.io
const __dirname = path.resolve();// Recupa o endereco absoluto da pasta raiz do projeto

console.log("valor do dirname: "+__dirname);// C:

const app = express();// Criando servidor do express
app.use( 
    express.static( path.join(__dirname, "public"))
    //OU
    //express.static( __dirname+"public");
);

const serverHttp = http.createServer(app);
//Criando servidor HTTP atraves do servidor do Express

const io = new Server(serverHttp);
/* Passando o server para dentro do IO para que o mesmo 
possa "escutar" o server http */

export { serverHttp, io };