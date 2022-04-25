import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { IsNotLoggedGuard } from './guards/is-not-logged.guard';


const routes: Routes = [
   {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
    {
    path: 'login',
      loadChildren: () => import('./components/sign-in/sign-in.module').then(m => m.SignInModule),
    canActivate: [IsNotLoggedGuard]
  },
    {
    path: 'register',
      loadChildren: () => import('./components/sign-up/sign-up.module').then(m => m.SignUpModule),
    canActivate: [IsNotLoggedGuard]
  },
    {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [IsLoggedGuard]
  },
    {
    path: 'editor',
    loadChildren: () => import('./components/editor/editor.module').then(m => m.EditorModule),
    canActivate: [IsLoggedGuard]
  },
      {
    path: 'editor/:slug',
    loadChildren: () => import('./components/editor/editor.module').then(m => m.EditorModule),
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'article/:slug',
    loadChildren: () => import('./components/article/article.module').then(m => m.ArticleModule)
  },
   {
    path: 'editor',
    loadChildren: () => import('./components/editor/editor.module').then(m => m.EditorModule),
    canActivate: [IsLoggedGuard]
  },
   {
    path: 'profile/:username',
     loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [IsLoggedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
