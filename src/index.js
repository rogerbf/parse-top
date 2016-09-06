const objectFromString = require('object-from-string')(': ')

module.exports = stdout => {

  const mainSections = stdout.trim().split('\n\n')
  const sections = {
    globalState: mainSections[0].split('\n'),
    keys: mainSections[1].slice(0, mainSections[1].indexOf('\n')),
    processes: mainSections[1].split('\n').slice(1)
  }

  const keyByIndex = (
  sections.keys
    .split(/\s+/g)
    .reduce((acc, key, i) => {
      return Object.assign(acc, { [i]: key })
    }, {})
  )

  const results = {}

  results.globalState = (
    sections.globalState
      .reduce((acc, line) => {
        // Time, in H:MM:SS format.
        // When running in logging mode Time is in YYYY/MM/DD HH:MM:SS
        // When running in accumulative event counting mode,
        // the Time is in HH:MM:SS since the beginning of the top process.
        if (line.match(/^\d{4}\/\d{2}\/\d{2}/) || line.match(/^\d+:\d{2}:\d{2}/)) {
          return Object.assign(acc, { 'Time': line })
        } else {
          return Object.assign(acc, objectFromString(line))
        }
      }, {})
  )

  results.processes = (
  sections.processes
    .map(stats => {
      return (
      stats
        .trim()
        .split(/\s+/g)
        .reduce((acc, value, index) => {
          return Object.assign(acc, { [keyByIndex[index]]: value })
        }, {})
      )
    })
  )

  return results
}
