import { Component, Input, OnInit, input } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { VotePayload } from '../vote/create-vote.payload';
import { AuthService } from '../../auth/shared/auth.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VoteService } from '../vote.service';
import { VoteType } from '../vote/vote-type';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrl: './vote-button.component.css'
})
export class VoteButtonComponent implements OnInit{

  @Input() post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isAuthenticated = this.authService.isLoggedIn();

  constructor(private voteService: VoteService, private authService: AuthService,
    private postService: PostService, private toastr: ToastrService,
  private router: Router, private authGuard: AuthGuard) {

    this.votePayload = {
      voteType: VoteType.UPVOTE,
      postId: 0
    }
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    if (this.isAuthenticated) {
      this.votePayload.voteType = VoteType.UPVOTE;
      this.vote();
      this.downvoteColor = '';
    }
    this.router.navigateByUrl('/login');
  }

  downvotePost() {
    if (this.isAuthenticated) {
      this.votePayload.voteType = VoteType.DOWNVOTE;
      this.vote();
      this.upvoteColor = '';
    }
    this.router.navigateByUrl('/login');
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}
