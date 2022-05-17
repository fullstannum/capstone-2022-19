const http = require("http");
const socket = require("socket.io");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");


const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer);
const PORT = process.env.PORT || 3000;

let iceServers = {
    iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
        {urls: 'turn:3.38.181.169:3478?transport=tcp', 
        username: 'reverse2', 
        credential: '277400'},
    ],
};


//routing
const routing = require("./routes/router");



//setting
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized : true
}))

app.use("/", routing);



let rooms = {};


//socket code
io.on("connection", (socket) => {
    console.log(`${socket.id} Connected`);

    //교수 입장
    socket.on("professorJoin", (data) => {
        let roomId = data.roomId;
        let userId = data.userId;
        console.log(`professor : ${userId} joined `);
        video_load = { roomId: roomId, userId: socket.id };
        if (roomId in rooms) {
            console.log("This room already exist");
            socket.emit("alreadyExist");
        } else {
            rooms[roomId] = { presenter: [], viewer: userId };
            socket.join(roomId);
            socket.emit('createRoom', data);
        }
        console.log(rooms[roomId]);
    });

    socket.on("studentJoin", (data) => {
        let roomId = data.roomId;
        let userId = data.userId;
        console.log(`Student : ${userId} joined `);

        if (roomId in rooms) {
            data['index'] = rooms[roomId].presenter.length;
            rooms[roomId].presenter.push(userId);
            socket.join(roomId);
            socket.emit('joinRoom', data);

        } else {
            console.log("This room doesn't exist");
            socket.emit("noRoom");
        }

        console.log(rooms[roomId]);
    })

    socket.on("studentSendIce", (candidate, data) => {
        socket.to(rooms[data.roomId].viewer).emit("stuIceArrived", candidate, data);
    })

    socket.on("professorSendIce", (candidate, data) => {
        socket.to(data.userId).emit("proIceArrived", candidate, data);
    })

    socket.on("reqAnswer", (offer, data) => {
        socket.to(rooms[data.roomId].viewer).emit("reqAnswer", offer, data);
    })

    socket.on("sendAnswer", (answer, data) => {
        socket.to(data.userId).emit("answerArrived", answer, data);
    })

})



const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(PORT, handleListen);