import { Kafka } from "kafkajs";

const kafka= new Kafka({
  clientId:'vision-api-clusters',
  brokers:['localhost:9092']
})

// Create consumer instance
const consumer = kafka.consumer({ groupId: 'my-group' });

// Consume messages
const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'brainless-bison', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

consumeMessages().catch(console.error);

