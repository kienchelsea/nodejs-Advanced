var express = require("express")
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs")
app.set("views", "./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(4000);

var arrayUser = [];

io.on("connection", function(socket) {
    console.log("Có người kết nối" + socket.id);
    socket.on("Client-send-Username", function(data){
        console.log(data);
        if(arrayUser.indexOf(data) >= 0) {
            socket.emit("Server-send-failed");
        } else {
            arrayUser.push(data);
            socket.Username = data;
            socket.emit("Server-send-sucessfully", data);
            io.sockets.emit("Server-send-listUserOnline", arrayUser)
        }
    })
    socket.on("logout", function(){
        arrayUser.splice(
            arrayUser.indexOf(socket.Username), 1
        );
        socket.broadcast.emit("Server-send-listUserOnline", arrayUser)
    })
    socket.on("user-send-message", function(data){
        io.sockets.emit("server-send-message", {user: socket.Username, content: data});
    })
    socket.on("Đang gõ chữ", function(){
        var s = socket.Username + "đang gõ chữ";
        io.sockets.emit("Ai đó đang gõ chữ", s);
    })
    socket.on("Ngừng gõ chữ", function(){
        io.sockets.emit("Ai đó ngừng gõ chữ");
    })
})

app.get("/", function (req, res) {
    res.render("trangchu");
})