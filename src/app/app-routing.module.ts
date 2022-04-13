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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
