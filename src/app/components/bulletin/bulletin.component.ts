import {Component, OnInit} from '@angular/core';
import {BulletinService} from '../../services/bulletin.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/combineAll';

export function orderBy (collection, props) {
  return collection.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
      return 1;
    }
    return 0;
  });
}

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.sass']
})
export class BulletinComponent implements OnInit {

  bulletin$ = this.bulletinService.bulletin$;

  posts$ = this.bulletinService.bulletin$
    .map(bulletin => bulletin.posts)
    .map(posts => orderBy(posts, {created: true}))
    .map(posts => posts.filter((post, index) => index < 10));

  loading$ = new BehaviorSubject(false);

  constructor(private bulletinService: BulletinService, private router: Router) { }

  ngOnInit() {
    this.listPosts();
  }

  listPosts () {
    const complete = new Subject();
    this.bulletinService.list(complete);
    this.load(complete);
  }

  createPost () {
    return this.router.navigate(['post/create']);
  }

  editPost (post) {
    return this.router.navigate([`post/edit/${post.id}`]);
  }

  deletePost (post) {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      const complete = new Subject();
      this.bulletinService.deletePost(post.id, complete);
      this.load(complete.do(() => this.listPosts()));
    }
  }

  replyPost () {

  }

  load (until: Observable<any>) {
    this.loading$.next(true);
    until.take(1).map(() => false).subscribe(this.loading$);
  }
}
