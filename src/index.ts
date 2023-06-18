import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { schema } from "./schema";

function main() {
  const yoga = createYoga({ schema })
  const server = createServer(yoga)
  server.listen(3000, () => {
    console.info('Server is running on http://localhost:3000/graphql')
  })
}
 
main()