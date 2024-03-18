import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, first, tap } from "rxjs";
import { PostService } from "./post.service";
import { Injectable } from "@angular/core";

@Injectable()
export class PostsResolver implements Resolve<boolean>{
    constructor(private postService: PostService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.postService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.postService.getAll();
                }
            }),
            first()
        );
    }

}