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
      if(!args.id){
        throw new Error('exercise id required');
      }
      const id = args.id as number;
      return prisma.exercise.findMany({ where: { id }, ...query });
    },
  })
);

builder.mutationField("addExercise", (t) =>
  t.prismaField({
    type: "Exercise",
    args: {
      workoutId: t.arg.int({ required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      const { workoutId, name } = args
      if(!workoutId || !name){
        throw new Error('both workoutID and exercise name are required');
      }
      return prisma.exercise.create({ 
        data: {
          workOutId: workoutId,
          name: name
        } 
      });
    },
  })
);
