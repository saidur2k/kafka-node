const avro = require('avsc')
const avroSchema = {
  name: 'HolidayDealType',
  type: 'record',
  fields: [
    {
      name: 'id',
      type: 'string'
    }, {
      name: 'timestamp',
      type: 'double'
    }, {
      name: 'dealType',
      type: {
        name: 'DealType',
        type: 'enum',
        symbols: ['hotel', 'tour', 'cruise']
      }
    }]
}

module.exports = avro.parse(avroSchema)

