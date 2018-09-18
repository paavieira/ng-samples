import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { UserService } from './user.service';

describe('components > with dependencies', () => {

  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  let userService: UserService;
  let el: HTMLElement;

  beforeEach(() => {

    const userServiceStub: Partial<UserService> = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };

    TestBed.configureTestingModule({
       declarations: [ WelcomeComponent ],
       providers:    [ {provide: UserService, useValue: userServiceStub } ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    userService = TestBed.get(UserService);
    el = fixture.nativeElement.querySelector('.welcome');

  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain('Welcome, Test User');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba';
    fixture.detectChanges();
    expect(el.textContent).toContain('Welcome, Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome');
    expect(content).toContain('Please log in.');
  });

});
