import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit{
  post!:any;

  constructor(private activeroute:ActivatedRoute, private postService: PostService){}

  ngOnInit(): void {
    let id='';
    this.activeroute.paramMap.subscribe((params:any) => {
      id = params.get('id');
    });

    this.postService.entities$.subscribe((posts)=>{
      this.post = posts.find((post) => post.id === id);      
    });
  }

}
