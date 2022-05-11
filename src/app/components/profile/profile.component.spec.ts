import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  class RouterStub {
    url = '';
    navigateByUrl(commands: any[], extras?: any) { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
       imports: [
        HttpClientTestingModule,
        NgxPaginationModule
      ],
      providers: [{ provide: Router, useClass: RouterStub }],
       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    
      fixture = TestBed.createComponent(ProfileComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getFavoritedArticles should be called', () => {
    let spy = spyOn(component, 'getFavoritedArticles').and.callThrough();
    spy.calls.reset();
    component.getFavoritedArticles(50, 0, 'username');
    expect(spy).toHaveBeenCalledOnceWith(50, 0, 'username');
  });

  it('getArticles should be called', () => {
    let spy = spyOn(component, 'getArticles').and.callThrough();
    spy.calls.reset();
    component.getArticles('username', 50, 0);
    expect(spy).toHaveBeenCalledOnceWith('username', 50, 0);
  });
  
  it('showOwnArticles should be called', () => {

      component.user = {
      email: 'email',
      token: 'token',
      username: 'username',
      bio: 'bio',
      image: 'image'
      };
    
    let spy = spyOn(component, 'showOwnArticles').and.callThrough();
    spy.calls.reset();
    component.showOwnArticles();
    expect(spy).toHaveBeenCalled();
  });
  
  it('showFavouriteArticles should be called', () => {
    
    component.user = {
      email: 'email',
      token: 'token',
      username: 'username',
      bio: 'bio',
      image: 'image'
    };

    let spy = spyOn(component, 'showFavouriteArticles').and.callThrough();
    spy.calls.reset();
    component.showFavouriteArticles();
    expect(spy).toHaveBeenCalled();
  });

  it('handlePageChange should be called', () => {
    let spy = spyOn(component, 'handlePageChange').and.callThrough();
    spy.calls.reset();
    component.handlePageChange(3);
    expect(spy).toHaveBeenCalledOnceWith(3);
  });
});
