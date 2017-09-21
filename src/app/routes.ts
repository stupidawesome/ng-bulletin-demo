import {Routes} from '@angular/router';
import {BulletinComponent} from './components/bulletin/bulletin.component';
import {PostBuilderComponent} from './components/post-builder/post-builder.component';

export const appRoutes: Routes = [
  { path: '', component: BulletinComponent },
  { path: 'post/create', component: PostBuilderComponent },
  { path: 'post/edit/:postId', component: PostBuilderComponent },
  { path: '**', component: BulletinComponent }
];
