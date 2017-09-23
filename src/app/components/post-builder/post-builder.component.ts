import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BulletinService} from '../../services/bulletin.service';
import {Post} from '../../models/post.model';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-post-builder',
  templateUrl: './post-builder.component.html',
  styleUrls: ['./post-builder.component.sass']
})
export class PostBuilderComponent implements OnInit {
  loading = false;
  postId = this.route.snapshot.params.postId;
  post = new Post();
  form: any;

  get author () {
    return this.form.controls.author;
  }

  get title () {
    return this.form.controls.title;
  }

  get message () {
    return this.form.controls.message;
  }

  get loadingObserver () {
    this.loading = true;
    return {
      next: () => this.loading = false,
      error: () => this.loading = false,
      complete: () => this.loading = false
    };
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bulletinService: BulletinService
  ) {
    this.form = fb.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit () {
    this.loadPost();
  }

  loadPost () {
    if (this.postId) {
      const postStream = this.bulletinService.findPostById(parseInt(this.postId, 10)).share();
      postStream.subscribe((post: Post) => {
        this.post = post;
        this.form.patchValue(post);
      });
      postStream.subscribe(this.loadingObserver);
    }
  }

  savePost () {
    const saveStream = this.bulletinService
      .savePost(Post.create({...this.post, ...this.form.value}))
      .share();

    saveStream.subscribe(() => this.router.navigate(['']));
    saveStream.subscribe(this.loadingObserver);
  }

  onSubmit () {
    this.setSubmitted();
    if (this.form.valid) {
      this.savePost();
    }
  }

  setSubmitted () {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
