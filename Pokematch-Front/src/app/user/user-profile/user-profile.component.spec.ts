import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { UserProfileComponent } from './user-profile.component';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let service: PokeApiService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      
    })
    
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
