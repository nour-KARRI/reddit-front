import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrl: './create-subreddit.component.css'
})
export class CreateSubredditComponent implements OnInit{

  createSubredditModel: SubredditModel
  createSubredditForm: FormGroup;

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
    this.createSubredditModel.name = this.createSubredditForm.get('title')?.value;
    this.createSubredditModel.description = this.createSubredditForm.get('description')?.value

    this.subredditService.createSubreddit(this.createSubredditModel)
    .subscribe(()=>{
      this.router.navigate([''])
    }, ()=>{
      console.log('Error occurred');
    })
  }
  discard(){
    this.router.navigateByUrl('/')
  }
}
