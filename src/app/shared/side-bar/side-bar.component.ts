import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor(private router: Router){
}

  goToCreateSubreddit(){
    this.router.navigateByUrl('/create-subreddit')
  }
  goToCreatePost(){
    this.router.navigateByUrl('/create-post')
  }
}
