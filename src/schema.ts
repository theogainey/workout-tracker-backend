import { writeFileSync } from 'fs';
import { builder } from "./builder";
import { printSchema, lexicographicSortSchema } from "graphql";

import "./models/WorkOut";
import "./models/Exercise";
import "./models/Set";

export const schema = builder.toSchema({});
const schemaAsString = printSchema(lexicographicSortSchema(schema));

writeFileSync('./src/schema.graphql', schemaAsString);
