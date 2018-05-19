require('dotenv').config()
const {KAFKA_URL, KAFKA_PRODUCER_TOPIC} = process.env
const kafka = require('kafka-node')
const HighLevelConsumer = kafka.HighLevelConsumer
const Client = kafka.Client

const client = new Client(KAFKA_URL)
const topics = [{
  topic: KAFKA_PRODUCER_TOPIC
}]

const type = require('./HoldayDealDescription')

const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'buffer'
}

const consumer = new HighLevelConsumer(client, topics, options)

consumer.on('message', (message) => {
  const buf = new Buffer(message.value, 'binary') // Read string into a buffer.
  const decodedMessage = type.fromBuffer(buf.slice(0)) // Skip prefix.
  console.log(decodedMessage)
})

consumer.on('error', (err) => {
  console.log('error', err)
})

process.on('SIGINT', () => {
  consumer.close(true, () => {
    process.exit()
  })
})
