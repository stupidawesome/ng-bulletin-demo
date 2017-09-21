import * as bulletin from '@/mocks/bulletin.json'

class HttpResponse {
  constructor (res) {
    this.status = res.status
    this.data = res.data
  }

  json () {
    return JSON.parse(this.data)
  }
}

export default class FakeBulletinBackend {
  static respond (data) {
    return new HttpResponse({
      status: 200,
      data: data
    })
  }

  static get () {
    return this.respond(JSON.stringify(bulletin))
  }

  static getPost (postId) {
    return this.respond(JSON.stringify(bulletin.posts.find((post) => post.id === postId)))
  }

  static addPost (post) {
    bulletin.posts = bulletin.posts.slice()
    bulletin.posts.push(Object.assign({}, post, {
      id: bulletin.posts.length + 1,
      created: Date.now()
    }))
    return this.respond(JSON.stringify(bulletin))
  }

  static editPost (post) {
    bulletin.posts = bulletin.posts.filter(bulletinPost => {
      return post.id !== bulletinPost.id
    })
    bulletin.posts.push(Object.assign({}, post, {
      modified: Date.now()
    }))

    return this.respond(JSON.stringify(bulletin))
  }

  static removePost (postId) {
    bulletin.posts = bulletin.posts.filter(post => {
      return post.id !== postId
    })
    return this.respond()
  }
}
