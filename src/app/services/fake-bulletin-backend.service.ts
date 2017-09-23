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

  static getPost (payload) {
    return this.respond(JSON.stringify(bulletin.posts.find((post) => post.id === payload.id)));
  }

  static addPost (payload) {
    const post = Object.assign({}, payload, {
      id: id++,
      created: Date.now()
    });
    bulletin.posts = bulletin.posts.slice();
    bulletin.posts.push(post);
    return this.respond(JSON.stringify(post));
  }

  static editPost (payload) {
    const index = bulletin.posts.findIndex(bulletinPost => {
      return payload.id === bulletinPost.id;
    });
    const post = Object.assign({}, payload, {
      modified: Date.now()
    });
    bulletin.posts[index] = post;

    return this.respond(JSON.stringify(post));
  }

  static removePost (payload) {
    bulletin.posts = bulletin.posts.filter(post => {
      return post.id !== payload.id;
    });
    return this.respond(JSON.stringify({}));
  }
}
