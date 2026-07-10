import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from '@fastify/type-provider-zod'
import { errorPlugin } from './api/plugins/error.plugin'
import { diPlugin } from './api/plugins/di.plugin'
import { workoutSessionRoutes } from './api/routes/workoutSession.routes'

const fastify = Fastify({ logger: true })
fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.get('/api/health', function (request, reply) {
  reply.send({
    status: 'OK',
    timestamp: new Date().toISOString(),
  })
})

fastify.register(errorPlugin)
fastify.register(diPlugin)
fastify.register(workoutSessionRoutes, { prefix: '/api/sessions' })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
