import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from '@fastify/type-provider-zod'
import {
  createWorkoutSessionSchema,
  updateWorkoutSessionSchema,
} from '@fitmetrics/shared'
import { z } from 'zod'

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

  server.patch(
    '/:id',
    {
      schema: {
        params: z.object({
          id: z.string().min(1, "L'identifiant est requis."),
        }),
        body: updateWorkoutSessionSchema,
      },
    },
    async (request, reply) => {
      const session = await fastify.di.updateSessionUseCase.execute(
        request.params.id,
        request.body,
      )
      return reply.status(200).send(session)
    },
  )

  server.delete(
    '/:id',
    {
      schema: {
        params: z.object({
          id: z.string({
            error: "L'identifiant est requis.",
          }),
        }),
      },
    },
    async (request, reply) => {
      await fastify.di.deleteSessionUseCase.execute(request.params.id)

      return reply.status(204).send()
    },
  )
}
