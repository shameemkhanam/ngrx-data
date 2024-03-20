import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm!: FormGroup;
  id!: string;

  constructor(private fb: FormBuilder, private postService: PostService, private activeroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.editPostForm = this.fb.group({
      title: [''],
      description: ['']
    });

    // this.id = this.activeroute.snapshot.params['id'];

    this.activeroute.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
    });

    this.postService.entities$.subscribe((posts) => {
      if (posts.length) {
        const post = posts.find((post) => post.id === this.id);
        this.editPostForm.patchValue({
          title: post?.title,
          description: post?.description
        });
      }

    });


  }

  onEditPost() {
    console.log(this.editPostForm.value);
    const postdata = { ...this.editPostForm.value, id: this.id };
    this.postService.update(postdata);
    this.router.navigate(['posts']);
  }
}
