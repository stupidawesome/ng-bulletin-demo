import Post from './Post.model'

export default class Bulletin {
  constructor (title, posts) {
    this.title = title
    this.posts = (posts || []).map(Post.create)
  }
}
