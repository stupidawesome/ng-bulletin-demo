import {Component, OnInit} from '@angular/core';
import {BulletinService} from '../../services/bulletin.service';
import {Router} from '@angular/router';

export function orderByCreated (collection) {
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

  loading = false;
  bulletinStream = this.bulletinService.bulletin$;
  postStream = this.bulletinService.bulletin$
    .map(bulletin => bulletin.posts)
    .map(posts => orderByCreated(posts))
    .map(posts => posts.filter((post, index) => index < 10));

  get loadingObserver () {
    this.loading = true;
    return {
      next: () => this.loading = false,
      error: () => this.loading = false,
      complete: () => this.loading = false
    };
  }

  constructor(private bulletinService: BulletinService, private router: Router) { }

  ngOnInit() {
    this.listPosts();
  }

  listPosts () {
    this.bulletinService.list()
      .subscribe(this.loadingObserver);
  }

  createPost () {
    return this.router.navigate(['post/create']);
  }

  editPost (post) {
    return this.router.navigate([`post/edit/${post.id}`]);
  }

  deletePost (post) {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      this.bulletinService
        .deletePost(post)
        .switchMap(() => this.bulletinService.list())
        .subscribe(this.loadingObserver);
    }
  }

  replyPost () {

  }
}
