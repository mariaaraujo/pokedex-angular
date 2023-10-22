import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditPokemonComponent } from '../add-or-edit-pokemon/add-or-edit-pokemon.component';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Output() deletePokemon: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  openEditPokemonDialog(pokemonId: string) {
    const dialogRef = this.dialog.open(AddOrEditPokemonComponent, {
      width: '400px',
      data: { pokemonId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  confirmDeletePokemon(pokemonId: string) {
    if (confirm('Deseja realmente deletar este Pokémon? Esta ação é irreversível.')) {
      this.deletePokemon.emit(pokemonId);
    }
  }
}
