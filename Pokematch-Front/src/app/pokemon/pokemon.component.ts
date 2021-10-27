import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pokemon } from '../../app/models/pokemon';
import { user } from '../models/user';
import { PokeApiService } from '../service/poke-api.service';
import { AuthService } from '@auth0/auth0-angular';

var pokelist: string[] = [];
var pokenames: string [] = [];
var poketype: string[] = [];
var profilepic: string[] = [];
var favoritepokemon: string[] = [];
var bao: string;

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  constructor(private route: Router, private UserService: PokeApiService, public auth: AuthService) { }

  userlist: user[] = [];

  user: user = {
    id: 0,
    username: '',
    email: '',
    gender: '',
    interest: '',
    profilepic: '',
    element: '',
    pokemons: []
  };

  charizard: pokemon = {

    name: '',
    hp: 0,
    imgUrl: '',
    userid: 0 ,
  };

  ngOnInit() {
    for (let i = 0; i < 11; i++) {
      this.getPokemon(i);
    }
  }


  getPokemon(name: number) {
    let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/' + name;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", pokeUrl, true);
    xhr.send();
    let pokemon: any = {}
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status > 199 && this.status < 300) {
          pokemon = JSON.parse(xhr.responseText);
          console.log(pokemon);
          let div = document.querySelector('.pokemon');
          document.querySelectorAll('.pokemon caption').forEach((el) => el.remove());
          let captionEl = document.createElement('caption');
          let pokename = document.createTextNode(pokemon.name);
          captionEl.appendChild(pokename);
          // div.appendChild(captionEl);
          pokelist.push(pokemon.sprites.front_default);
          pokenames.push(pokemon.name);
          poketype.push(pokemon.types[0].type.name)
        }
      }
    }
  }

  getPokemonList() {
    // document.getElementById("List").innerHTML = '<img src="' + pokelist.join('" /><img src="') + '" />';
    // document.getElementById("names").innerHTML = '   ' + pokenames.join('   ') + '   ';
    for (let i = 1; i < 11; i++) {
      document.getElementById(String(i)).innerHTML = '<img src="' + pokelist[i - 1] + ('" /><img src="') + '" />' + 'Pokemon: ' + pokenames[i - 1] + ', ' + 'Type: ' + poketype[i - 1];
    }
  }

  selectedPokemon(net: number) {
    if (profilepic[0] == null) {
      this.auth.user$.subscribe(
        (profile) => (bao = profile.email),
      );
      this.UserService.getUserList().then(result => {
        this.userlist = result;
        console.log(this.userlist);
        for (let i = 0; i < this.userlist.length; i++) {
          if (this.userlist[i].email == bao) {
            this.user.id = this.userlist[i].id;
            this.UserService.getUserById(this.user.id).then(user => {
              this.user = user;
              console.log(user);
              this.user.profilepic = '<img src="' + pokelist[net - 1] + '" /><img src="' + 'width = "50"' + 'height="50"';
              this.UserService.UpdateUser(user)
              console.log(user);
            });
          }
        }
      })
      alert("You have chosen " + pokenames[net - 1] + " for your profile picture!");
      profilepic.push(pokelist[net - 1]);
      document.getElementById('profilepic').innerHTML = '<img src="' + pokelist[net - 1] + ('" /><img src="') + 'width = "50"' + 'height="50"'
      document.getElementById('directions').innerHTML = "Please select your top 3 favortite pokemon! The first selection being your favorite and the third selection being your 3rd favorite."
      return;
    }
    if (favoritepokemon[2] != null) {
      alert("You may only select 3 favorite pokemon");
      console.log(favoritepokemon);
      console.log(profilepic);
      return;
    }
    this.auth.user$.subscribe(
      (profile) => (bao = profile.email),
    );
    this.UserService.getUserList().then(result => {
      this.userlist = result;
      console.log(this.userlist);
      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].email == bao) {
          this.user.id = this.userlist[i].id;
          this.UserService.getUserById(this.user.id).then(user => {
            this.user = user;
            this.charizard.userid = this.user.id;
            this.charizard.name = pokenames[net - 1];
            this.charizard.imgUrl = '<img src="' + pokelist[net - 1] + '" /><img src="' + 'width = "50"' + 'height="50"';
            this.charizard.hp = 100;
            this.UserService.AddPokemon(this.charizard)
            console.log(this.charizard);
            console.log(pokenames[net - 1]);
          });
        }
      }
    })
    alert("You have selected " + pokenames[net - 1])
    favoritepokemon.push(pokelist[net - 1]);
    return;
    // this.route.navigate(['/pokemonselection'])
  }

  yolo: string = '';
  SearchPokemon(yolo: string) {
    yolo.toLowerCase();
    let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/' + yolo;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", pokeUrl, true);
    xhr.send();
    let pokemon: any = {}
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status > 199 && this.status < 300) {
          pokemon = JSON.parse(xhr.responseText);
          console.log(pokemon);
          let div = document.querySelector('.pokemon');
          document.querySelectorAll('.pokemon caption').forEach((el) => el.remove());
          let captionEl = document.createElement('caption');
          let pokename = document.createTextNode(pokemon.name);
          captionEl.appendChild(pokename);
          // div.appendChild(captionEl);
          pokelist.push(pokemon.sprites.front_default);
          pokenames.push(pokemon.name);
          poketype.push(pokemon.types[0].type.name)
          document.getElementById('result1').innerHTML = '<img src="' + pokemon.sprites.front_default + ('" /><img src="') + '" />'
        }
      }
    }
  }

  selectedSearchedPokemon() {
    let z = pokelist.length;
    if (profilepic[0] == null) {
        this.auth.user$.subscribe(
          (profile) => (bao = profile.email),
        );
      this.UserService.getUserList().then(result => {
        this.userlist = result;
        console.log(this.userlist);
        for (let i = 0; i < this.userlist.length; i++) {
          if (this.userlist[i].email == bao) {
            this.user.id = this.userlist[i].id;
            this.UserService.getUserById(this.user.id).then(user => {
              this.user = user;
              this.user.profilepic = '<img src="' + pokelist[z - 1] + '" /><img src="' + 'width = "50"' + 'height="50"';
              this.UserService.UpdateUser(user)
            });
          }
        }
      })
      alert("You have chosen " + pokenames[z-1] + " for your profile picture!");
      profilepic.push(pokelist[z-1]);
      document.getElementById('profilepic').innerHTML = '<img src="' + pokelist[z-1] + ('" /><img src="') + 'width = "50"' + 'height="50"'
      document.getElementById('directions').innerHTML = "Please select your top 3 favortite pokemon! The first selection being your favorite and the third selection being your 3rd favorite."
      return;
    }
    if (favoritepokemon[2] != null) {
      alert("You may only select 3 favorite pokemon");
      console.log(favoritepokemon);
      console.log(profilepic);
      return;
    }
    favoritepokemon.push(pokelist[z-1]);
    alert("You have selected " + pokelist[z-1])
      this.auth.user$.subscribe(
        (profile) => (bao = profile.email),
      );
      this.UserService.getUserList().then(result => {
        this.userlist = result;
        console.log(this.userlist);
        for (let i = 0; i < this.userlist.length; i++) {
          if (this.userlist[i].email == bao) {
            this.user.id = this.userlist[i].id;
            this.UserService.getUserById(this.user.id).then(user => {
              this.user = user;
              this.charizard.userid = this.user.id;
              this.charizard.name = pokenames[z - 1];
              this.charizard.imgUrl = '<img src="' + pokelist[z - 1] + '" /><img src="' + 'width = "50"' + 'height="50"';
              this.charizard.hp = 100;
              this.UserService.AddPokemon(this.charizard)
              console.log(this.charizard);
              console.log(pokenames[z - 1]);
            });
          }
        }
      })
    return;
    // this.route.navigate(['/pokemonselection'])
  }
}
