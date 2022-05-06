import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  const draftResUser: ResponseUser =  {
    email: 'email',
    token: 'token',
    username: 'username',
    bio: 'bio',
    image: 'href'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
       imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doUserLogout should be called', () => {
    let spy = spyOn(component, 'doUserLogout').and.callThrough();
    spy.calls.reset();
    component.doUserLogout();
    expect(spy).toBeTruthy();
  });
  
  it('publish should be called', () => {
    let spy = spyOn(component, 'publish').and.callThrough();
    spy.calls.reset();
    component.publish();
    expect(spy).toBeTruthy();
  });
  
  it('updareForm should be called', () => {
    let spy = spyOn(component, 'updareForm').and.callThrough();
    spy.calls.reset();
    component.updareForm(draftResUser);
    expect(spy).toBeTruthy();
  });
});
