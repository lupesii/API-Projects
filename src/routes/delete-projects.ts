import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from "../db/connection.ts";
import { projectsTable } from "../db/schema/projects.ts";

export async function deleteProject(app: FastifyInstance) {
  
  app.delete('/projects/:id', async (request, reply) => {
   
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
     
     
      const result = await db.delete(projectsTable)
        .where(eq(projectsTable.id, id))
        .returning({ deletedId: projectsTable.id });

     
      if (result.length === 0) {
        return reply.status(404).send({ 
          error: 'Not Found',
          message: 'Projeto não encontrado.' 
        });
      }

      return reply.status(204).send();
      
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({ 
        error: 'Internal Server Error',
        message: 'Falha ao excluir o projeto.' 
      });
    }
  });
}