export class Post {
  constructor (
    public id = '',
    public author = '',
    public title = '',
    public message = '',
    public created = '',
    public modified = '',
  ) {}

  static create (opts) {
    return new Post(opts.id, opts.author, opts.title, opts.message, opts.created, opts.modified);
  }
}
