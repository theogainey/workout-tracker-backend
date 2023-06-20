import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("WorkOut", {
  fields: t => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    exercises: t.relation("exercises"),
  })
})

builder.queryField("workouts", (t) =>
  t.prismaField({
    type: ["WorkOut"],
    args: {
      id: t.arg.int(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const { id } = args
      return id 
      ? prisma.workOut.findMany({ where: { id }, ...query })
      : prisma.workOut.findMany({ ...query });
    },
  })
);

