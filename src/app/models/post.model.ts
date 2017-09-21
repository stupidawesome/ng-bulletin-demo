export default class Post {

  constructor (id, author, title, message, created, modified) {
    this.id = id
    this.author = author
    this.title = title
    this.message = message
    this.created = created
    this.modified = modified
  }

  static create (opts) {
    return new Post(opts.id, opts.author, opts.title, opts.message, opts.created, opts.modified)
  }
}
