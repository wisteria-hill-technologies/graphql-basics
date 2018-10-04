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
    name: 'Bill',
    email: 'bill@emailemail.com',
    age: 45
  },
  {
    id: '4',
    name: 'Sarah',
    email: 'sarah@emailemail.com',
    age: 27
  },
];

const posts = [
  {
    id: '001',
    title: 'My first post',
    body: 'This is my first post.',
    published: true,
    author: '4'
  },
  {
    id: '002',
    title: 'How to make a pancake',
    body: 'This is how to do it.',
    published: false,
    author: '2'
  },
  {
    id: '003',
    title: 'Javascript is great!',
    body: 'It is interesting to learn javascript...',
    published: true,
    author: '2'
  },
];

const comments = [
  {
    id: '100',
    text: 'This is a great post'
  },
  {
    id: '200',
    text: 'This post is cool!'
  },
  {
    id: '300',
    text: 'Here is my comments...'
  },
];


// Type definition (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    comments (query: String): [Comment!]!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }
  
  type Comment {
    id: ID!
    text: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users (parent, args, ctx, info) {
      if(!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if(!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const titleIncludesQuery = post.title.toLowerCase().includes(args.query.toLowerCase());
        const bodyIncludesQuery = post.body.toLowerCase().includes(args.query.toLowerCase());
        return titleIncludesQuery || bodyIncludesQuery;
      });
    },
    comments(parent, args, ctx, info) {
      if(!args.query) {
        return comments;
      }
      return comments.filter(comment => comment.text.includes(args.query));
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
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
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