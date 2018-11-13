const readline = require("readline")
const WebSocket = require("ws")
const _ = require("lodash")
const structure = require("./structure")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.prompt()

const server = new WebSocket.Server({ port: 8090 })

server.on("connection", ws => {
  console.log("Someone connected")

  rl.on("line", index => {
    const message = getMessage(index)
    try {
      ws.send(message)
    } catch (error) {
      console.error(error)
      ws.close()
    }
    rl.prompt()
  })
})

function getMessage(index) {
  const copy = _.cloneDeep(structure)
  copy.data.regions[index - 1].statechange = true
  return JSON.stringify(copy, null, 2)
}
