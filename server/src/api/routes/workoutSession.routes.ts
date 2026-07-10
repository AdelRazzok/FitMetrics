import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from '@fastify/type-provider-zod'
import { createWorkoutSessionSchema } from '@fitmetrics/shared'
import { DomainError } from '../../domain/errors/DomainError'

export async function workoutSessionRoutes(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<ZodTypeProvider>()

  server.get('/', async (request, reply) => {
    const sessions = await fastify.di.getAllWorkoutSessionsUseCase.execute()
    return reply.status(200).send(sessions)
  })

  server.post(
    '/',
    { schema: { body: createWorkoutSessionSchema } },
    async (request, reply) => {
      const session = await fastify.di.createSessionUseCase.execute(
        request.body,
      )
      return reply.status(201).send(session)
    },
  )
}
