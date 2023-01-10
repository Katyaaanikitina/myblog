import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  postSub: Subscription
  constructor(private postsService: PostsService) { }
  
  ngOnInit(): void {
    this.postSub = this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts
    })
  }

  ngOnDestroy() {
    if(this.postSub) {
      this.postSub.unsubscribe()
    }
  }

  remove(id: string) {

  }
}

