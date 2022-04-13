import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';



@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
