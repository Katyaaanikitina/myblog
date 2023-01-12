import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "src/app/shared/interfaces";

@Pipe({
    name: 'searchPosts'
})

export class SearchPipe implements PipeTransform {
    transform(posts: Post[], search = ''): Post[] {
        if(!search.trim()) {
            return posts
        }

        return posts.filter(post => {
            return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })
    }

}