import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BindingBannerComponent } from './binding-banner.component';

describe('components > binding', () => {
  let component: BindingBannerComponent;
  let fixture: ComponentFixture<BindingBannerComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BindingBannerComponent]
    });
    fixture = TestBed.createComponent(BindingBannerComponent);
    component = fixture.componentInstance; // BindingBannerComponent test instance
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('no title in the DOM after createComponent()', () => {
    expect(h1.textContent).not.toEqual(component.title);
  });

  it('no title in the DOM after createComponent()', () => {
    expect(h1.textContent).toEqual('');
  });

  it('should display original title after detectChanges()', () => {
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(h1.textContent).toContain('Test Title');
  });

});
