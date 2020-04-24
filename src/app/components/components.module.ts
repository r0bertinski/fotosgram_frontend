import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    PostComponent,  // We dont export it because we wont use it outside the components module.
    PostsComponent,  // We EXPORT it because we will use it outside the components module.
    MapComponent,  // We dont export it because we wont use it outside the components module.
    AvatarSelectorComponent  // We dont export it because we wont use it outside the components module.
  ],
  exports: [
    // PostComponent, // We dont export it because we wont use it outside the components module.
    PostsComponent, // We will use it in tab1.page.html
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
