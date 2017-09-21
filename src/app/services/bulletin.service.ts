import {Bulletin} from '../models/bulletin.model';
import {FakeBulletinBackend} from './fake-bulletin-backend.service';
import {Post} from '../models/post.model';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class BulletinService {

  private bulletin: ReplaySubject<Bulletin> = new ReplaySubject();

  get bulletin$ () {
    return this.bulletin.asObservable();
  }

  list (observer) {
    FakeBulletinBackend.get()
      .delay(500)
      .map(res => res.json())
      .map(data => new Bulletin(data.title, data.posts))
      .subscribe(observer);

    observer.subscribe(this.bulletin);
  }

  addPost (post, observer) {
    FakeBulletinBackend.addPost(post)
      .delay(1000)
      .map(res => res.json())
      .map(data => new Bulletin(data.title, data.posts))
      .subscribe(observer);

    observer.subscribe(this.bulletin);
  }

  savePost (post, observer) {
    return post.id === undefined ? this.addPost(post, observer) : this.editPost(post, observer);
  }

  findPostById (postId, observer) {
    FakeBulletinBackend.getPost(postId)
      .delay(500)
      .map(res => res.json())
      .map(data => Post.create(data))
      .subscribe(observer);

    observer.subscribe(this.bulletin);
  }

  editPost (post, observer) {
    FakeBulletinBackend.editPost(post)
      .delay(1000)
      .map(res => res.json())
      .map(data => new Bulletin(data.title, data.posts))
      .subscribe(observer);

    observer.subscribe(this.bulletin);
  }

  deletePost (postId, observer) {
    FakeBulletinBackend.removePost(postId)
      .delay(1000)
      .map(res => res.json())
      .subscribe(observer);
  }
}
