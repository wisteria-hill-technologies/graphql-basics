const Post = { //below functions are called only called by user's query.
  author(parent, args, { db }, info) {
    return db.users.find(user => user.id === parent.author);
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => comment.post=== parent.id);
  }
};

export { Post as default };