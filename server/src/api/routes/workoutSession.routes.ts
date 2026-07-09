import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from '@fastify/type-provider-zod'
import { createWorkoutSessionSchema } from '@fitmetrics/shared'
import { DomainError } from '../../domain/errors/DomainError'

export async function workoutSessionRoutes(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<ZodTypeProvider>()

  server.post(
    '/',
    {
      schema: { body: createWorkoutSessionSchema },
    },
    async (request, reply) => {
      try {
        const session = await fastify.di.createSessionUseCase.execute(
          request.body,
        )

        return reply.status(201).send(session)
      } catch (error) {
        if (error instanceof DomainError) {
          return reply.status(400).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Erreur interne du serveur.' })
      }
    },
  )
}
