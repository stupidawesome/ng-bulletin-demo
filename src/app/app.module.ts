import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {BulletinComponent} from './components/bulletin/bulletin.component';
import {PostComponent} from './components/post/post.component';
import {PostBuilderComponent} from './components/post-builder/post-builder.component';
import {InputComponent} from './components/input/input.component';
import {BulletinService} from './services/bulletin.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BulletinComponent,
    PostComponent,
    PostBuilderComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    BulletinService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
