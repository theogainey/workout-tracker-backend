import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Set", {
  fields: t => ({
    id: t.exposeID("id"),
    duration: t.expose("duration", {
      type: "Int", 
      nullable: true
    }),
    weight: t.expose("weight", {
      type: "Int",
      nullable: true 
    }),
    repetitions: t.expose("repetitions", {
      type: "Int",
      nullable: true 
    }),
  })
})

builder.queryField("set", (t) => 
  t.prismaField({
    type: ["Set"],
    args: {
      id: t.arg.int(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const id = args.id as number;
      return prisma.set.findMany({ where: { id }, ...query });
    },
  })
);

builder.mutationField("addSet", (t) =>
  t.prismaField({
    type: "Set",
    args: {
      exerciseId: t.arg.int({ required: true }),
      duration: t.arg.int({ required: false }),
      weight: t.arg.int({ required: false }),
      repetitions: t.arg.int({ required: false }),
    },
    resolve: async (query, root, args, ctx, info) => {
      const { exerciseId, duration, weight, repetitions} = args
      if(!exerciseId){
        throw new Error('exerciseId required');
      }
      return prisma.set.create({ 
        data: {
          ...args
        } 
      });
    },
  })
);
