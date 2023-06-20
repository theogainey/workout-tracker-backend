import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Exercise", {
  fields: t => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    sets: t.relation("sets"),
  })
})

builder.queryField("exercise", (t) => 
  t.prismaField({
    type: ["Exercise"],
    args: {
      id: t.arg.int(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const id = args.id as number;
      return prisma.exercise.findMany({ where: { id }, ...query });
    },
  })
);
