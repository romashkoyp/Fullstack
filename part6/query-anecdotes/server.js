import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (request, response, next) => {
  console.log("Validator called:", request.method, request.body)

  const { content } = request.body
  console.log(content)

  if (request.method==='POST' && (!content || content.length<5) ) {
        return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more'
    })
  } else {
    console.log("Validation passed")
    next()
  }
}

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
