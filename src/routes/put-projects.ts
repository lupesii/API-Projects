import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from "../db/connection.ts";
import { projectsTable } from "../db/schema/projects.ts";

export async function putProject(app: FastifyInstance) {
  
  app.put('/projects/:id', async (request, reply) => {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    });


    const bodySchema = z.object({
        Titulo: z.string(),
        Descricao: z.string(),
        webSiteURL: z.url(),
        githubURL: z.url(),
        status: z.boolean(),
        imageURL: z.url()
    });

    const { id } = paramsSchema.parse(request.params);
    const updateData = bodySchema.parse(request.body);

    try {
    
      const result = await db.update(projectsTable)
        .set({
          title: updateData.Titulo,
          description: updateData.Descricao,
          webSiteURL: updateData.webSiteURL,
          githubURL: updateData.githubURL,
          status: updateData.status,
          imageURL: updateData.imageURL,
        })
        .where(eq(projectsTable.id, id))
        .returning();

    
      if (result.length === 0) {
        return reply.status(404).send({ message: 'Projeto não encontrado.' });
      }

      return reply.status(200).send(result[0]);

    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({ message: 'Erro ao atualizar o projeto.' });
    }
  });
}