import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrl: './post-tile.component.css'
})
export class PostTileComponent implements OnInit{
  
  @Input() posts: PostModel[]

  
  faComments = faComments;

  constructor(private router: Router){
    
  }
  ngOnInit(){
  }
  goToPost(id: number): void{
    this.router.navigateByUrl('view-post/'+ id)
  }

}
