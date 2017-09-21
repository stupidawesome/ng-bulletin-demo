import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BulletinService} from '../../services/bulletin.service';
import {Post} from '../../models/post.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-post-builder',
  templateUrl: './post-builder.component.html',
  styleUrls: ['./post-builder.component.sass']
})
export class PostBuilderComponent implements OnInit, OnDestroy {

  post: Post = new Post();
  form: any;
  loading$ = new BehaviorSubject(false);
  private sub: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private bulletinService: BulletinService) {
    this.form = fb.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit () {
    this.sub = this.route.params.subscribe((params) => {
      if (params.postId) {
        const complete = new Subject();
        this.bulletinService.findPostById(parseInt(params.postId, 10), complete);
        complete.subscribe((post: Post) => {
          this.post = post;
          this.form.patchValue(post);
        });
      }
    });
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  onSubmit () {
    const complete = new Subject();
    this.bulletinService.addPost(Post.create({...this.post, ...this.form.value}), complete);
    this.load(complete.do(() => this.router.navigate([''])));
  }

  load (until: Observable<any>) {
    this.loading$.next(true);
    until.take(1).map(() => false).subscribe(this.loading$);
  }
}
