import * as _bulletin from '../mocks/bulletin.json';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
const bulletin: any = _bulletin;

let id = bulletin.posts.length + 1;

class HttpResponse {
  constructor (
    public status: number,
    public data: string | undefined,
  ) {}

  json () {
    return JSON.parse(this.data);
  }
}

export class FakeBulletinBackend {
  static respond (data?) {
    return Observable.of(new HttpResponse(200, data)).first();
  }

  static get () {
    return this.respond(JSON.stringify(bulletin));
  }

  static getPost (postId) {
    return this.respond(JSON.stringify(bulletin.posts.find((post) => post.id === postId)));
  }

  static addPost (post) {
    bulletin.posts = bulletin.posts.slice();
    bulletin.posts.push(Object.assign({}, post, {
      id: id++,
      created: Date.now()
    }));
    return this.respond(JSON.stringify(bulletin));
  }

  static editPost (post) {
    const index = bulletin.posts.findIndex(bulletinPost => {
      return post.id === bulletinPost.id;
    });
    bulletin.posts[index] = Object.assign({}, post, {
      modified: Date.now()
    });

    return this.respond(JSON.stringify(bulletin));
  }

  static removePost (postId) {
    bulletin.posts = bulletin.posts.filter(post => {
      return post.id !== postId;
    });
    return this.respond();
  }
}
