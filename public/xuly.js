var socket = io("http://localhost:4000");

socket.on("Server-send-failed", function(){
    alert("Tên Đăng ký không hợp lệ, Vui lòng đổi tên khác")
})
socket.on("Server-send-listUserOnline", function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class = 'user'>" + i + "</div>");
    })
})
socket.on("Server-send-sucessfully", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
})
socket.on("server-send-message", function(data){
    $("#listUser").append("<div class = 'mm'>" + data.user + ":" + data.content +"</div>")
})
socket.on("Ai đó đang gõ chữ", function(data){
    $("#Notice").html(data + "<img src = 'tải xuống.png'>")
})
socket.on("Ai đó ngừng gõ chữ", function(){
    $("#Notice").html("")
})

    
$(document).ready(function() {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit("Client-send-Username", $("#textUsername").val())
    })
    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(2000);
        $("#chatForm").hide(1000);
    })
    $("#sendMessage").click(function(){
        socket.emit("user-send-message", $("#contentMessage").val())

    })
    $("#contentMessage").focusin(function(){
        socket.emit("Đang gõ chữ");
    })
    $("#contentMessage").focusout(function(){
        socket.emit("Ngừng gõ chữ");
    })

})
