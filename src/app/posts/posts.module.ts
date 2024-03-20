import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsResolver } from "./posts.resolver";
import { SinglePostComponent } from "./single-post/single-post.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { PostsDataService } from "./posts-data.service";
import { Post } from "../models/post.model";

const routes: Routes = [
    {
        path: '', component: PostsListComponent,
        resolve: { posts: PostsResolver }
    },
    {
        path: 'add-post', component: AddPostComponent
    },
    {
        path: 'edit-post/:id', component: EditPostComponent,
        resolve: { posts: PostsResolver }
    },
    {
        path: 'details/:id', component: SinglePostComponent,
        resolve: { posts: PostsResolver }
    }
];

const entityMetadata: EntityMetadataMap = {
    Post: {
        sortComparer:sortByName,
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: false
        }
    }
};

function sortByName(a:Post, b:Post):number{
    // return a.title.localeCompare(b.title); ascending order
    let comp = a.title.localeCompare(b.title);
    if(comp > 0) return -1;
    if(comp < 0) return 1;
    return comp;
}

@NgModule({
    declarations: [
        PostsListComponent,
        AddPostComponent,
        EditPostComponent,
        SinglePostComponent,],
    imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
    providers: [PostsResolver]
})
export class PostsModule {

    constructor(eds:EntityDefinitionService, entityDataService: EntityDataService, postsDataService: PostsDataService){
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Post', postsDataService);

    }

}