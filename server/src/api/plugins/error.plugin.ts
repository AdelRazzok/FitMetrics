import fp from 'fastify-plugin'
import { hasZodFastifySchemaValidationErrors } from '@fastify/type-provider-zod'
import { DomainError } from '../../domain/errors/DomainError.js'

export const errorPlugin = fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      const issues = error.validation.map((err: any) => {
        const fieldName = err.instancePath
          ? err.instancePath.replace(/^\//, '')
          : 'global'

        return {
          field: fieldName,
          message: err.message,
        }
      })

      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'La validation des données a échoué.',
        issues,
      })
    }

    if (error instanceof DomainError) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'La validation des données a échoué.',
        issues: [
          {
            field: error.field || 'global',
            message: error.message,
          },
        ],
      })
    }

    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Une erreur inattendue est survenue sur le serveur.',
    })
  })
})
