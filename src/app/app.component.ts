import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './shared/interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pokemonsData: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.http.get<Pokemon[]>('https://localhost:7026/api/pokemon')
      .subscribe(data => {
        this.pokemonsData = data;
      }, error => {
        console.error(error);
      });
  }
}
