const kafka = require('kafka-node')
const HighLevelProducer = kafka.HighLevelProducer
// const KeyedMessage = kafka.KeyedMessage
const Client = kafka.Client
const type = require('./HolidayDealType')
const client = new Client('localhost:2181', 'my-client-id', {
  sessionTimeout: 300,
  spinDelay: 100,
  retries: 2
})

client.on('error', function (error) {
  console.error(error)
})

const producer = new HighLevelProducer(client)

producer.on('ready', function () {
    // Create message and encode to Avro buffer
  const messageBuffer = type.toBuffer({
    dealType: 'tour',
    id: 'fc4483c6-06bc-4ee6-b2ee-c681cdd09cf8',
    timestamp: Date.now()
  })

    // Create a new payload
  const payload = [{
    topic: 'node-test',
    messages: messageBuffer,
        // Use Gzip compresson
    attributes: 1
  }]

    // Send payload to Kafka and log result/error
  producer.send(payload, function (error, result) {
    console.info('Sent payload to Kafka: ', payload)

    if (error) {
      console.error(error)
    } else {
    //   const formattedResult = result[0]
      console.log('result: ', result)
    }
  })
})

producer.on('error', function (error) {
  console.error(error)
})
