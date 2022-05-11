import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  const userServiceStub = jasmine.createSpyObj('UserService', ['getNewUser', 'getToken', 'getLoggedUser']);

  class RouterStub {
    url = '';
    navigateByUrl(commands: any[], extras?: any) { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
       imports: [
        HttpClientTestingModule,
      ],
      providers: [{ provide: Router, useClass: RouterStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('doUserLogout should be called', () => {
    let spy = spyOn(component, 'doUserLogout').and.callThrough();
    spy.calls.reset();
    component.doUserLogout();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('should unsubscribe', () => {
    component['subscriptionUser$'] = of().subscribe();
    const unsubscriptionSpy = spyOn(component['subscriptionUser$'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscriptionSpy).toHaveBeenCalledTimes(1);
  });

});
