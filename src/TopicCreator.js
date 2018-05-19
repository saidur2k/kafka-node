const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.Client();
const producer = new Producer(client);

/**
* Creating kafka's topic with command line
* e.g. node TopicCreater.js my-new-topic
*/
producer.on("ready", () => {
    console.log("Producer is ready !");
    let topicName = process.argv[2];

    // Create topics async
    console.log("Creating topic...");

    producer.createTopics(topicName, (err, data) => {
        console.log(`Topic '${topicName}' sucessfully created !`);
        producer.close();
    });
});

producer.on("error", err => console.error(err));