import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RouterLinkComponent } from './router-link.component';
import { RouterLinkDirectiveStub } from '../../helpers/router-link-directive-stub';

// (os imports foram omitidos)

describe('RouterLinkComponent', () => {

  let component: RouterLinkComponent;
  let fixture: ComponentFixture<RouterLinkComponent>;

  let linkDes: DebugElement[];
  let routerLinks: RouterLinkDirectiveStub[];

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        RouterLinkComponent,
        RouterLinkDirectiveStub
      ],
    });

    fixture = TestBed.createComponent(RouterLinkComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));

  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/dashboard');
    expect(routerLinks[1].linkParams).toBe('/heroes');
    expect(routerLinks[2].linkParams).toBe('/about');
  });

  it('can click Heroes link in template', () => {
    const heroesLinkDe = linkDes[1];   // heroes link DebugElement
    const heroesLink = routerLinks[1]; // heroes link directive
    expect(heroesLink.navigatedTo).toBeNull('should not have navigated yet');
    heroesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(heroesLink.navigatedTo).toBe('/heroes');
  });

});
