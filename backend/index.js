import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

// --------------------Kafka --------------------
import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: 'vision-api-clusters',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'my-group' });
await consumer.connect();
await consumer.subscribe({ topic: 'brainless-bison', fromBeginning: true }); // we cant subscribe while consuming
// --------------------Kafka --------------------
 
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
    },
});
const consumeMessages = async () => {
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("Ready TO Take off")
            io.emit('chat message', message.value.toString());
        },
    });
};
// consumeMessages().catch(console.error);


// creating socket to emit the data to client using kafka consumer
io.on('connection', (socket) => {
    socket.on('connect', () => {
        console.log('Connected to server')
        io.emit('chat message', 'Hello from the IO!');
    });


    socket.on('chat message', async(msg) => {
        // console.log('Received message:', msg); // from client side
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("Ready TO Take off")
                io.emit('chat message', message.value.toString());
            },
        });
        // io.emit('chat message', "Hello from the IO!");
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


// server setup
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


