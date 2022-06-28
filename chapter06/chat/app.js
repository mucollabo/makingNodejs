const http = require("http");
const express = require("express");
const app = express();

const server = http.Server(app);
const io = require("Socket.io")(server);
let users = [];

server.listen(8080, () => {
    console.log("running at port:8080");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    let name = "";
    socket.on("has connected", (username) => {   // event: has disconnected
        name = username;
        users.push(username);
        io.emit("has connected", { username: username, userList: users });
    });

    socket.on("has disconnected", () => {   // event: has disconnected
        users.splice(users.indexOf(name), 1);
        io.emit("has disconnected", { username: name, userList: users });
    });

    socket.on("new message", (data) => {   // event: new message
        io.emit("new message", data);   // send the message to all socket
    });
});
