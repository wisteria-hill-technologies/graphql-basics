import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: '1',
    name: 'Bob',
    email: 'bob@emailemail.com',
    age: 30
  },
  {
    id: '2',
    name: 'Mike',
    email: 'mike@emailemail.com',
    age: 43
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'sarah@emailemail.com',
    age: 27
  },
];

// Type definition (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users (parent, args, ctx, info) {
      return users;
  },
    me() {
      return {
        id: '123abc',
        name: 'Mike',
        email: 'mike@myemail.com',
        age: 35
      }
    },
    post() {
      return {
        id: '092',
        title: 'GraphQL 101',
        body: 'Hello, World!!!',
        published: true
      }
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up!');
});