import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrl: './create-subreddit.component.css'
})
export class CreateSubredditComponent implements OnInit{

  createSubredditModel: SubredditModel
  createSubredditForm: FormGroup;
  newTitle: string;

  constructor(private subredditService: SubredditService, private router: Router,
    private toastr: ToastrService
  ){
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
    this.createSubredditModel={
    name: '',
    description: ''
    }
  }

  ngOnInit(){}

  createSubreddit(){
    this.newTitle="r/";
    this.createSubredditModel.name = this.newTitle.concat(this.createSubredditForm.get('title')?.value);
    this.createSubredditModel.description = this.createSubredditForm.get('description')?.value

    this.subredditService.createSubreddit(this.createSubredditModel)
    .subscribe(()=>{
      this.router.navigate([''])
    }, error=>{
      throwError(error)
    })
  }

  discard(){
    this.router.navigateByUrl('/')
  }
}
