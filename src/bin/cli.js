#!/usr/bin/env node
const stream = require('stream')
const parse = require('../index.js')

const concat = Object.assign(
  new stream.Transform({
    transform (chunk, encoding, callback) {
      this.concatenated = this.concatenated + chunk.toString()
      callback()
    },
    flush () {
      this.push(this.concatenated)
      this.push(null)
    }
  }),
  { concatenated: '' }
)

const toJSON = Object.assign(
  new stream.Transform({
    transform (chunk, encoding, callback) {
      callback(
        null,
        JSON.stringify(parse(chunk.toString()), null, 2).concat('\n')
      )
    }
  })
)

process.stdin
  .pipe(concat)
  .pipe(toJSON)
  .pipe(process.stdout)
