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
  deleteSub: Subscription
  searchStr = ''

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

    if(this.deleteSub) {
      this.deleteSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id)
    })
  }
}

