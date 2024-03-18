import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit{
  addPostForm!:FormGroup;

  constructor(private fb:FormBuilder, private postService: PostService, private router: Router){}

  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      title:[''],
      description:['']
    });
  }

  onAddPost(){
    console.log(this.addPostForm.value);
    const post: Post = this.addPostForm.value;
    this.postService.add(post).subscribe((data)=>{
      this.router.navigate(['posts']);
    });
  }

}
