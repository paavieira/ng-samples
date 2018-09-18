import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { RouterLinkDirectiveStub } from '../../helpers/router-link-directive-stub';

@Component({selector: 'app-banner', template: ''})
class BannerStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

@Component({selector: 'app-welcome', template: ''})
class WelcomeStubComponent {}

describe('components > nested-components', () => {

  it('should have created component (with stubs)', () => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        BannerStubComponent,
        RouterOutletStubComponent,
        WelcomeStubComponent
      ]
    });

    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;

    expect(component).toBeDefined();

  });

  it('should have created component (with NO_ERRORS_SCHEMA)', () => {

    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })

    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;

    expect(component).toBeDefined();

  });

});
