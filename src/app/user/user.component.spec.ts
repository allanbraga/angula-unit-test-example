import { async, ComponentFixture, TestBed,fakeAsync,tick} from '@angular/core/testing';

import { UserComponent } from './user.component';
import {UserService} from "./user.service";
import {DataService} from "../shared/data.service";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should use the user name from UserService', () => {
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display the user name if the user is logged in', () => {
    component.isLogged = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(component.user.name);
    expect(compiled.querySelector('h1').textContent).toContain('user is logged in');
  });
  it('should not display the user name if the user is not logged in', () => {
    component.isLogged = false;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
    expect(compiled.querySelector('h1').textContent).toContain('User is not logged in');
  });

  // how to test async service calls
  it('should fetch data successfully if called asynchronously', async(() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');
    });
  }));

  // how to test fake async service calls do not need to wait the Stable state
  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(component.data).toBe('Data');

  }));
});
