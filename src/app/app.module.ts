import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateArticleComponent,
    ViewArticleComponent,
    MainPageComponent,
    EditArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
