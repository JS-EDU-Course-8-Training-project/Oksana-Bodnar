import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateArticle } from 'src/app/shared/models/createArticle.model';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
       imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('update should be called', () => {
       let spy = spyOn(component, 'update').and.callThrough();
       spy.calls.reset();
    component.update();

    expect(spy).toBeTruthy();
    });
  
      it('publish should be called', () => {
       let spy = spyOn(component, 'publish').and.callThrough();
       spy.calls.reset();
    component.publish();

    expect(spy).toBeTruthy();
      });
  
});
