import {Bulletin} from '../models/bulletin.model';
import {FakeBulletinBackend} from './fake-bulletin-backend.service';
import {Post} from '../models/post.model';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';

@Injectable()
export class BulletinService {

  private bulletin: ReplaySubject<Bulletin> = new ReplaySubject(1);

  get bulletin$ () {
    return this.bulletin.asObservable();
  }

  private addPost (payload: Post) {
    return FakeBulletinBackend.addPost(payload)
      .delay(1000)
      .map(res => res.json())
      .map(data => Post.create(data));
  }

  private editPost (payload: Post) {
    return FakeBulletinBackend.editPost(payload)
      .delay(1000)
      .map(res => res.json())
      .map(data => Post.create(data));
  }

  list () {
    return FakeBulletinBackend.get()
      .delay(500)
      .map(res => res.json())
      .map(data => new Bulletin(data.title, data.posts))
      .do(bulletin => this.bulletin.next(bulletin));
  }

  savePost (post: Post) {
    return post.id === '' ? this.addPost(post) : this.editPost(post);
  }

  findPostById (postId) {
    return FakeBulletinBackend.getPost({id: postId})
      .delay(500)
      .map(res => res.json())
      .map(data => Post.create(data));
  }


  deletePost (payload: Post) {
    return FakeBulletinBackend.removePost({id: payload.id})
      .delay(1000)
      .map(res => res.json());
  }
}
