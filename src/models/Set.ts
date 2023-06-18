import { builder } from "../builder";

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
