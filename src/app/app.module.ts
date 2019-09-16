import { AuthEffects } from './features/auth/store/auth.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './routing/app-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AlertMsgComponent } from './shared/alert-msg/alert-msg.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { BtnSpinnerComponent } from './shared/btn-spinner/btn-spinner.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ModalAuthComponent } from './shared/modal-auth/modal-auth.component';
import { AuthFormComponent } from './features/auth/components/auth-form/auth-form.component';
import { StoreModule } from '@ngrx/store';
import { NewPostComponent } from './pages/blog/new-post/new-post.component';
import { PostFormComponent } from './features/posts/components/post-form/post-form.component';
import { AddControlBtnComponent } from './features/posts/components/post-form/add-control-btn/add-control-btn.component';
import { HideDropDownDirective } from './directives/hide-drop-down.directive';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';
import { appReducer } from './app-store/app-store';
import { PostsEffects } from './features/posts/store/posts.effects';
import { ViewPostComponent } from './features/posts/components/view-post/view-post.component';
import { TransformToHTMLPipe } from './pipes/transform-to-html.pipe';
import { PostsLoopComponent } from './features/posts/components/posts-loop/posts-loop.component';
import { PostsLoopByCategoryPipe } from './pipes/posts-loop-by-category.pipe';
import { SinglePostComponent } from './pages/blog/single-post/single-post.component';
import { EditPostComponent } from './pages/blog/edit-post/edit-post.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { HomeSectionCategoriesComponent } from './pages/home/home-section-categories/home-section-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlertMsgComponent,
    SpinnerComponent,
    BtnSpinnerComponent,
    HomeComponent,
    BlogComponent,
    ModalAuthComponent,
    AuthFormComponent,
    NewPostComponent,
    PostFormComponent,
    AddControlBtnComponent,
    HideDropDownDirective,
    SafeHTMLPipe,
    ViewPostComponent,
    TransformToHTMLPipe,
    PostsLoopComponent,
    PostsLoopByCategoryPipe,
    SinglePostComponent,
    EditPostComponent,
    HeaderComponent,
    HomeSectionCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, PostsEffects]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }