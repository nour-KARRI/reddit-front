import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/post.service';
import { ActivatedRoute, Router} from '@angular/router';
import { PostModel } from '../../shared/post-model';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from '../../comment/comment-payload';
import { CommentService } from '../../comment/comment.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent implements OnInit{

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[]
  some:false

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private authService: AuthService,
    private router: Router) {
      this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    })

    this.commentPayload ={
      text: '',
      postId: this.postId,
      username: '',
      createDate: ''
    };

    this.post= {
      id: 0,
      postName: '',
      url: '',
      description: '',
      voteCount: 0,
      username: '',
      subredditName: '',
      commentCount: 0,
      duration: '',
      upVote: false,
      downVote: false,
  }
  }

  ngOnInit(){
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    if(this.authService.isLoggedIn()){
      this.commentPayload.text = this.commentForm.get('text')!.value;
    this.commentService.postComment(this.commentPayload).subscribe(() => {
      this.commentForm.get('text')!.setValue('');
      this.getCommentsForPost();
      this.discardComment();
    }, error => {
      throwError(error);
    })
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data=>{
      this.comments = data
    }, error =>{
      throwError(error)
    })
  }

  getPostById() {
    this.postService.getPost(this.postId).subscribe(data =>{
      this.post = data;
    }, error=> {
      throwError(error)
    })
  }

  discardComment(){
    this.commentForm.reset();
  }
}
