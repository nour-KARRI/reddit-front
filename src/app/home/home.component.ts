import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { PostModel } from '../shared/post-model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

posts: Array<PostModel> = [];

upvoteColor:string
downvoteColor:string

constructor(private postService: PostService){
  this.postService.getAllPosts().subscribe(post=>{
    this.posts = post;
  });
}

ngOnInit(): void {
}

}
