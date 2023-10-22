  import { Component, OnInit, Inject } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

  import axios from 'axios';
  import { PokemonType } from '../enums';
  import { Pokemon } from '../shared/interface';

  interface AddPokemon {
    name: string;
    description: string;
    type: string[];
  }

  @Component({
    selector: 'app-add-or-edit-pokemon',
    templateUrl: './add-or-edit-pokemon.component.html',
  })
  export class AddOrEditPokemonComponent implements OnInit {
    openModal: boolean = false;
    pokemonId: string = '';
    refresh: () => Promise<void> = async () => {};

    form: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      type: new FormControl([]),
    });

    objKeyPokemonType = Object.keys(PokemonType);
    updateMode: boolean = !!this.pokemonId;

    constructor(public dialogRef: MatDialogRef<AddOrEditPokemonComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data && data.pokemonId) {
        this.pokemonId = data.pokemonId;
      }
    }

    ngOnInit(): void {
      this.updateMode = !!this.pokemonId
      if (this.updateMode) {
        this.getPokemonById(this.pokemonId);
      }
      else{
        console.log(this.pokemonId)
      }
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }

    onSubmit(): void {
      if (this.form.valid) {
        const values = this.form.value;
        if (this.updateMode) {
          this.updatePokemon(this.pokemonId, values);
        } else {
          this.addPokemon(values);
        }
      }
    }

    async getPokemonById(id: string): Promise<void> {
      try {
        const response = await axios.get(`https://localhost:7026/api/pokemon/${id}`);
        const data: Pokemon = response.data;
        this.setPokemonValue(data);
      } catch (error) {
        console.error(error);
      }
    }

    async addPokemon(values: AddPokemon): Promise<void> {
      try {
        const response = await axios.post('https://localhost:7026/api/pokemon', {
          name: values.name,
          description: values.description,
          type: values.type.length > 0 ? values.type : ['NORMAL']
        });
        if (response.status === 201) {
          this.refresh();
          this.dialogRef.close();
        }
      } catch (error) {
        console.error(error);
      }
    }

    async updatePokemon(id: string, values: AddPokemon): Promise<void> {
      try {
        const response = await axios.put(`https://localhost:7026/api/pokemon/${id}?_id=${id}`, {
          name: values.name,
          description: values.description,
          type: values.type.length > 0 ? values.type : ['NORMAL']
        });
        if (response.status === 204) {
          this.refresh();
          this.dialogRef.close();
        }
      } catch (error) {
        console.error(error);
      }
    }

    setPokemonValue(pokemon: Pokemon): void {
      this.form.patchValue({
        name: pokemon.name,
        description: pokemon.description,
        type: pokemon.type
      });
    }
  }
