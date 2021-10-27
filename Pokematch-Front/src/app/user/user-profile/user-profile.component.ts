import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokeApiService } from '../../Service/poke-api.service';
import { user } from '../../models/user';
import { AuthService } from '@auth0/auth0-angular';
var wtf: string;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService, private currentRoute: ActivatedRoute, private UserService: PokeApiService) { }

  userlist: user[] = [];

  user: user = {
    id: 0,
    username: '',
    email: '',
    gender: '',
    interest: '',
    profilepic: '',
    pokemons: '',
    element: []
  };

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (wtf = profile.email),
    );
    this.UserService.getUserList().then(result => {
      this.userlist = result;
      console.log(this.userlist);
      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].email == wtf) {
          this.user.id = this.userlist[i].id;
          this.UserService.getUserById(this.user.id).then(user => {
            this.user = user;
            document.getElementById('profilepic').innerHTML = this.user.profilepic;
            document.getElementById('yup').innerHTML = this.user.profilepic;
            console.log(user);
          });
        }
      }
    })
  };
}
