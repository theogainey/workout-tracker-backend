"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_graphql_yoga = require("graphql-yoga");
var import_http = require("http");

// src/schema.ts
var import_fs = require("fs");

// src/builder.ts
var import_core = __toESM(require("@pothos/core"));
var import_graphql_scalars = require("graphql-scalars");
var import_plugin_prisma = __toESM(require("@pothos/plugin-prisma"));

// src/db.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/builder.ts
var builder = new import_core.default({
  plugins: [import_plugin_prisma.default],
  prisma: {
    client: prisma
  }
});
builder.addScalarType("Date", import_graphql_scalars.DateResolver, {});
builder.queryType({});
builder.mutationType({});

// src/schema.ts
var import_graphql = require("graphql");

// src/models/WorkOut.ts
builder.prismaObject("WorkOut", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "Date"
    }),
    exercises: t.relation("exercises")
  })
});
builder.queryField(
  "workouts",
  (t) => t.prismaField({
    type: ["WorkOut"],
    args: {
      id: t.arg.int({ required: false })
    },
    resolve: async (query, root, args, ctx, info) => {
      const { id } = args;
      return id ? prisma.workOut.findMany({ where: { id }, ...query }) : prisma.workOut.findMany({ ...query });
    }
  })
);
builder.mutationField(
  "createWorkout",
  (t) => t.prismaField({
    type: "WorkOut",
    resolve: async (query, root, args, ctx, info) => {
      return prisma.workOut.create({ data: {} });
    }
  })
);

// src/models/Exercise.ts
builder.prismaObject("Exercise", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    sets: t.relation("sets")
  })
});
builder.queryField(
  "exercise",
  (t) => t.prismaField({
    type: ["Exercise"],
    args: {
      id: t.arg.int()
    },
    resolve: async (query, root, args, ctx, info) => {
      if (!args.id) {
        throw new Error("exercise id required");
      }
      const id = args.id;
      return prisma.exercise.findMany({ where: { id }, ...query });
    }
  })
);
builder.mutationField(
  "addExercise",
  (t) => t.prismaField({
    type: "Exercise",
    args: {
      workoutId: t.arg.int({ required: true }),
      name: t.arg.string({ required: true })
    },
    resolve: async (query, root, args, ctx, info) => {
      const { workoutId, name } = args;
      if (!workoutId || !name) {
        throw new Error("both workoutID and exercise name are required");
      }
      return prisma.exercise.create({
        data: {
          workOutId: workoutId,
          name
        }
      });
    }
  })
);

// src/models/Set.ts
builder.prismaObject("Set", {
  fields: (t) => ({
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
    })
  })
});
builder.queryField(
  "set",
  (t) => t.prismaField({
    type: ["Set"],
    args: {
      id: t.arg.int()
    },
    resolve: async (query, root, args, ctx, info) => {
      const id = args.id;
      return prisma.set.findMany({ where: { id }, ...query });
    }
  })
);
builder.mutationField(
  "addSet",
  (t) => t.prismaField({
    type: "Set",
    args: {
      exerciseId: t.arg.int({ required: true }),
      duration: t.arg.int({ required: false }),
      weight: t.arg.int({ required: false }),
      repetitions: t.arg.int({ required: false })
    },
    resolve: async (query, root, args, ctx, info) => {
      const { exerciseId, duration, weight, repetitions } = args;
      if (!exerciseId) {
        throw new Error("exerciseId required");
      }
      return prisma.set.create({
        data: {
          ...args
        }
      });
    }
  })
);

// src/schema.ts
var schema = builder.toSchema({});
var schemaAsString = (0, import_graphql.printSchema)((0, import_graphql.lexicographicSortSchema)(schema));
(0, import_fs.writeFileSync)("./src/schema.graphql", schemaAsString);

// src/index.ts
function main() {
  const yoga = (0, import_graphql_yoga.createYoga)({ schema });
  const server = (0, import_http.createServer)(yoga);
  server.listen(3e3, () => {
    console.info("Server is running on http://localhost:3000/graphql");
  });
}
main();
