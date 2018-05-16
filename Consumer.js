const kafka = require('kafka-node')
const HighLevelConsumer = kafka.HighLevelConsumer
const Client = kafka.Client

const client = new Client('localhost:2181')
const topics = [{
  topic: 'node-test'
}]

const type = require('./HoldayDealDescription')

const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'buffer'
}

const consumer = new HighLevelConsumer(client, topics, options)

consumer.on('message', function (message) {
  const buf = new Buffer(message.value, 'binary') // Read string into a buffer.
  const decodedMessage = type.fromBuffer(buf.slice(0)) // Skip prefix.
  console.log(decodedMessage)
})

consumer.on('error', function (err) {
  console.log('error', err)
})

process.on('SIGINT', function () {
  consumer.close(true, function () {
    process.exit()
  })
})
