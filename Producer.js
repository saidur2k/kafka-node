require('dotenv').config()
const { KAFKA_URL, KAFKA_CONSUMER_ID, KAFKA_PRODUCER_TOPIC } = process.env

const kafka = require('kafka-node')
const HighLevelProducer = kafka.HighLevelProducer
const Client = kafka.Client
const type = require('./HolidayDealType')
const client = new Client(KAFKA_URL, KAFKA_CONSUMER_ID, {
  sessionTimeout: 300,
  spinDelay: 100,
  retries: 2
})

client.on('error', (error) => {
  console.error(error)
})

const producer = new HighLevelProducer(client)

producer.on('ready', () => {
    // Create message and encode to Avro buffer
  const messageBuffer = type.toBuffer({
    dealType: 'hotel',
    id: 'fc4483c6-06bc-4ee6-b2ee-c681cdd09cf8',
    timestamp: Date.now()
  })

    // Create a new payload
  const payload = [{
    topic: KAFKA_PRODUCER_TOPIC,
    messages: messageBuffer,
        // Use Gzip compresson
    attributes: 1
  }]

    // Send payload to Kafka and log result/error
  producer.send(payload, (error, result) => {
    console.info('Sent payload to Kafka: ', payload)

    if (error) {
      console.error(error)
    } else {
      console.log('result: ', result)
      process.exit()
    }
  })
})

producer.on('error', (error) => {
  console.error(error)
})
