import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditpricePage } from './editprice.page';

describe('EditpricePage', () => {
  let component: EditpricePage;
  let fixture: ComponentFixture<EditpricePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpricePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditpricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
