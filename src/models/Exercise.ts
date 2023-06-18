import { builder } from "../builder";

builder.prismaObject("Exercise", {
  fields: t => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    sets: t.relation("sets"),
  })
})
