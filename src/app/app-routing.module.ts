import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main-page' },
  { path: 'main-page', component: MainPageComponent },
  { path: 'create-article', component: CreateArticleComponent },
  { path: 'edit-article/:id', component: EditArticleComponent },
  { path: 'view-article', component: ViewArticleComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
