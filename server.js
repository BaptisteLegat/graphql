// server.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./types');
const root = require('./resolvers');
const db = require('./db');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => console.log(`Serveur GraphQL lancé sur http://localhost:${PORT}/graphql`));
