import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription } from 'rxjs';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: RouterTestingModule;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
       imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    
  });

afterEach(() => {
  fixture.destroy();
})

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('doUserLogout should be called', () => {
    spyOn(component, 'doUserLogout').and.callThrough();
    let a = component.doUserLogout();
    expect(a).toBeFalsy();
    });
  
    it('getNewUser should be called', () => {
    spyOn(component, 'getNewUser').and.callThrough();
    let a = component.getNewUser();
    expect(a).toBeTruthy();
    });
  
  it('should unsubscribe', () => {
  component['subscriptionUser$'] = of().subscribe();
  const unsubscriptionSpy = spyOn(component['subscriptionUser$'], 'unsubscribe');
  component.ngOnDestroy();
  expect(unsubscriptionSpy).toHaveBeenCalled();
  });
});
