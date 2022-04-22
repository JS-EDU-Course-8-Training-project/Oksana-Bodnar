import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
    {
    path: 'login',
    loadChildren: () => import('./components/sign-in/sign-in.module').then(m => m.SignInModule)
  },
    {
    path: 'register',
    loadChildren: () => import('./components/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
    {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)
  },
    {
    path: 'editor',
    loadChildren: () => import('./components/editor/editor.module').then(m => m.EditorModule)
  },
      {
    path: 'editor/:slug',
    loadChildren: () => import('./components/editor/editor.module').then(m => m.EditorModule)
  },
  {
    path: 'article/:slug',
    loadChildren: () => import('./components/article/article.module').then(m => m.ArticleModule)
  },
   {
    path: 'editor',
    loadChildren: () => import('./components/editor/editor.module').then(m => m.EditorModule)
  },
   {
    path: 'profile/:username',
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
