import { Kafka } from 'kafkajs';

// Used to manipulate topics in kafka you can also use kafka-topics.sh see https://kafka.apache.org/quickstart
export async function isTopicExists(topicName) { // looking for a topic 
    const kafka = new Kafka({
        brokers: ['localhost:9092'],
    });
    const admin = kafka.admin();
    await admin.connect();
    const topics = await admin.listTopics();
    if (topics.includes(topicName)) {
        await admin.disconnect();
        return true;
    }
    await admin.disconnect();
    return false;
}

export async function createTopic(topicName, numPartitions) {
    const kafka = new Kafka({
        brokers: ['localhost:9092'],
    });

    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [{
            topic: topicName,
            numPartitions: numPartitions,
        }],
    });
    await admin.disconnect();
}

export async function deleteTopics(topicName) {
    const kafka = new Kafka({
        brokers: ['localhost:9092'],
    });
    const admin = kafka.admin();
    await admin.connect();
    await admin.deleteTopics({
        topics: [topicName],
    });
    await admin.disconnect();
}

// case 1 -> create a topic
// createTopic("brainless-bison").catch((error) => {
//     console.error(`Failed to create topic: ${error}`);
// }).then(e => console.log('topic created'));

// case 2 -> check if topic exists
// isTopicExists('test').then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.error(`Failed to check if topic exists: ${error}`);
// });

// case 3 -> delete a topic
// deleteTopics('test').catch((e) => console.log(e));