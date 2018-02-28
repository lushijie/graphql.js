/*
* @Author: lushijie
* @Date:   2018-02-26 11:18:54
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 12:05:34
*/
import koa from 'koa'; // koa@2
import koaRouter from 'koa-router'; // koa-router@next
import koaBody from 'koa-bodyparser'; // koa-bodyparser@next
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({
  schema: schema,
  context: {
  },
  rootValue: {
    name: 'lucy'
  },
  formatError: err => {
    if (err.originalError && err.originalError.error_message) {
      err.message = err.originalError.error_message + 'sss';
    }

    return err;
  },
  formatResponse: res => {
    return res;
  },
  // validationRules
  // formatParams
  tracing: false
}));
router.get('/graphql', graphqlKoa({ schema: schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
