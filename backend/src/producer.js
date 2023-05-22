/**
 * Using cron to schedule the producer to send messages to the Kafka cluster every 2 Minutes. 
 * See README.md for more information about cron.
 */
import { Kafka } from "kafkajs";
import { basicinfo, cpuinfo, diskinfo, memoryinfo } from "./data.js";

const kafka= new Kafka({
  clientId:'vision-api-clusters',
  brokers:['localhost:9092']
})
const producer=kafka.producer();

// connecting to producer
const produceMessages = async () => {
  await producer.connect();
  await producer.send({
    topic: 'brainless-bison', 
    messages: [
      {
        value: JSON.stringify({
          basicinfo: await basicinfo,
          cpuinfo: await cpuinfo(),
          memoryinfo: await memoryinfo(),
          diskinfo: await diskinfo(),
        }),
      },
    ],
  });
  await producer.disconnect();
};

produceMessages().catch(console.error);

