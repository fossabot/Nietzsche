const { mineQuotes } = require('./miner')
const { success, failure } = require('./utils/responses')

const { maxPage, startPage } = require('./config')

module.exports.test = (event, context, callback) => {
  return callback(null, success({ data: 'OK' }))
}

module.exports.mine = (event, context, callback) => {
  try {
    for (let page = startPage; page < maxPage + 1; page++) {
      mineQuotes(page)
        .then(data => {
          console.log(`Page: ${page} complete`)
          if (page === maxPage) {
            callback(null, success({ data: 'OK' }))
          }
        })
        .catch(err => {
          throw err
        })
    }
  } catch (err) {
    callback(null, failure(err))
  }
}
