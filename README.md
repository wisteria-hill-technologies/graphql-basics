# GraphQL Server Basic Examples

## How to install
- clone this repo.
- npm install

## How to spin
- npm start
- Go to localhost: 4000 on your browser to own graphQL playground.

## Functionalities
You can do the following:
- query
- mutation
- subscription

## Data
- Currently, using a fake data (no database used)


## schema.graphql
```
type Subscription {
    post: PostSubscriptionPayload!
    comment(postId: ID!): CommentSubscriptionPayload!
}

enum MutationType {
    CREATED
    UPDATED
    DELETED
}

type PostSubscriptionPayload {
    mutation: MutationType!
    data: Post!
}

type CommentSubscriptionPayload {
    mutation: MutationType!
    data: Comment!
}
```

## How to publish
Examples below
``` 
pubsub.publish('post', {
    post: {
      mutation: 'CREATED',
      data: post
    }
});
```
``` 
pubsub.publish(`comment ${args.data.post}`, {
  comment: {
    mutation: 'CREATED',
    data: comment
  }
});
```