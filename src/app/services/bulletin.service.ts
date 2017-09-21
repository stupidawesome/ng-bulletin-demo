import FakeBulletinBackend from './FakeBulletinBackend.service'
import Bulletin from '@/models/Bulletin.model'
import Post from '@/models/Post.model'
import delay from '@/helpers/delay'

export default class BulletinService {

  static bulletin = new Bulletin()

  static list () {
    return delay(500)
      .then(() => FakeBulletinBackend.get())
      .then(res => res.json())
      .then(data => new Bulletin(data.title, data.posts))
      .then((bulletin) => {
        this.bulletin = bulletin
        return bulletin
      })
  }

  static addPost (post) {
    return delay(1000)
      .then(() => FakeBulletinBackend.addPost(post))
  }

  static savePost (post) {
    return post.id === undefined ? BulletinService.addPost(post) : BulletinService.editPost(post)
  }

  static findPostById (postId) {
    return delay(500)
      .then(() => FakeBulletinBackend.getPost(postId))
      .then(res => res.json())
      .then(data => Post.create(data))
  }

  static editPost (post) {
    return delay(1000)
      .then(() => FakeBulletinBackend.editPost(post))
  }

  static deletePost (postId) {
    return delay(1000)
      .then(() => FakeBulletinBackend.removePost(postId))
  }
}
