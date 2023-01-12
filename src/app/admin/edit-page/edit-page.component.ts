import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: Post
  submitted = false
  uSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        author: new FormControl(post.author, Validators.required),
        text: new FormControl(post.text, Validators.required)
      }
      )
    })
  }

  ngOnDestroy(): void {
    this.uSub.unsubscribe()
  }

  submit() {
    if(this.form.invalid) {
      return 
    }

    this.submitted = true
    
    this.uSub = this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text
    }).subscribe(() => {
      this.submitted = false
    })
  }

}
