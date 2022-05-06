import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditorModule { }
