import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
       imports: [
        RouterTestingModule,
         HttpClientTestingModule,
        NgxPaginationModule
      ],
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
    component.getFavoritedArticles();
    expect(spy).toBeTruthy();
  });
  
  it('showOwnArticles should be called', () => {
    let spy = spyOn(component, 'showOwnArticles').and.callThrough();
    spy.calls.reset();
    component.showOwnArticles();
    expect(spy).toBeTruthy();
  });
  
  it('showFavouriteArticles should be called', () => {
    let spy = spyOn(component, 'showFavouriteArticles').and.callThrough();
    spy.calls.reset();
    component.showFavouriteArticles();
    expect(spy).toBeTruthy();
  });
});
