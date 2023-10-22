import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditPokemonComponent } from '../add-or-edit-pokemon/add-or-edit-pokemon.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Output() deletePokemon: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  openEditPokemonDialog(pokemonId: string): void {
    const dialogRef = this.dialog.open(AddOrEditPokemonComponent, {
      width: '400px',
      data: { pokemonId }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


  confirmDeletePokemon(pokemonId: string) {
    if (confirm('Deseja realmente deletar este Pokémon? Esta ação é irreversível.')) {
      this.http.delete(`https://localhost:7026/api/pokemon/${pokemonId}?_id=${pokemonId}`)
      .subscribe(status => {
        if(status == 204) {}
      }, error => {
        console.error(error);
      });
    }
  }
}
