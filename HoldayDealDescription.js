const typeDescription = {
  name: 'HolidayDealType',
  type: 'record',
  fields: [{
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
  } ]
}

const avro = require('avsc')
module.exports = avro.parse(typeDescription)

