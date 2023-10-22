import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditPokemonComponent } from '../add-or-edit-pokemon/add-or-edit-pokemon.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddPokemonDialog() {
    const dialogRef = this.dialog.open(AddOrEditPokemonComponent, {
      width: '400px',
      data: { pokemonId: '', refresh: this.refresh.bind(this) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  refresh() {
  }
}
