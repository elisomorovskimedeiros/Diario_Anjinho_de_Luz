const express = require("express"),
fs = require("fs"),
https = require("https"),
redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
caminho_chave_privada = "/etc/ssl/private/server.key",
caminho_certificado = "/etc/ssl/certs/server.crt";

const privateKey = fs.readFileSync(caminho_chave_privada, "utf8"),
certificate = fs.readFileSync(caminho_certificado, "utf8");

let app = express();
credenciais = {key: privateKey, cert: certificate};

// Redirecionamento HTTP to HTTPS,
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
let router = require("./Controller/router");
//app.use(router);


// your express configuration here
var httpsServer = https.createServer(credenciais, app);


httpsServer.listen(443, function () {
    console.log("Tomando um chima pela porta " + 443);
});
