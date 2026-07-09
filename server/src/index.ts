import Fastify from 'fastify'

const fastify = Fastify({
  logger: true,
})

fastify.get('/health', function (request, reply) {
  reply.send({
    status: 'OK',
    timestamp: new Date().toISOString(),
  })
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
