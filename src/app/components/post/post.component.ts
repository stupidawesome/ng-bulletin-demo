import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../models/post.model';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Output() onEdit = new EventEmitter<Post>();
  @Output() onDelete = new EventEmitter<Post>();
  @Output() onReply = new EventEmitter<Post>();

  isAuthored = true;
  isActionsOpen = false;
  now: number;

  get postDate () {
    const postMoment = moment(this.post.created, 'x');
    const date = moment(this.now);
    const daysSince = date.diff(postMoment, 'days');
    const hoursSince = date.diff(postMoment, 'hours');
    const minutesSince = date.diff(postMoment, 'minutes');

    let postDate;
    if (daysSince > 0) {
      postDate = `${daysSince} day${daysSince > 1 ? 's' : ''} ago`;
    } else if (hoursSince > 0) {
      postDate = `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`;
    } else if (minutesSince > 0) {
      postDate = `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`;
    } else {
      postDate = 'a moment ago';
    }

    return postDate;
  }

  constructor() { }

  ngOnInit() {
    this.startTimer();
  }

  edit () {
    this.onEdit.emit(this.post);
  }

  remove () {
    this.onDelete.emit(this.post);
  }

  reply () {
    this.onReply.emit(this.post);
  }

  toggleActions () {
    this.isActionsOpen = !this.isActionsOpen;
  }

  startTimer () {
    window.setInterval(() => {
      this.now = Date.now();
    }, 1000);
  }
}
