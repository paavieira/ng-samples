import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {

  let component;

  beforeEach(() => {
    component = new SwitchComponent();
  });

  it('#clicked() should toggle #isOn', () => {

    expect(component.isOn).toBe(false);

    component.clicked();
    expect(component.isOn).toBe(true);

    component.clicked();
    expect(component.isOn).toBe(false);

  });

  it('#clicked() should set #message to "The light is on"', () => {

    expect(component.message).toBe('The light is off');

    component.clicked();
    expect(component.message).toBe('The light is on');

  });

});
