import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent  implements OnInit{
  editPostForm!:FormGroup;
  id!:any;

  constructor(private fb:FormBuilder, private postService: PostService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.paramMap.subscribe(res =>{
      console.log('id',res);
      
    });
    this.editPostForm = this.fb.group({
      title:[''],
      description:['']
    });
  }

  onEditPost(){
    console.log(this.editPostForm.value);
    
  }
}
