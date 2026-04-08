import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HarrypotterService } from '../../services/harrypotter';
import { Character } from '../../models/character';

import {MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-characterfilter',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.scss',
})
export class Characterfilter implements OnInit {
  houses: string[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']
  selectedHouse: string = '';
  characters: Character[] = [];
  loading = false;

  constructor(
    private hpService: HarrypotterService,
    private router: Router
  ){}

  ngOnInit(): void {}
  
  onHouseChange(): void {
    if(!this.selectedHouse) return;
    this.loading = true;
    this.hpService.getCharactersByHouse(this.selectedHouse).subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching characters:', err);
        this.loading = false;
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/character', id]);
  }

  getHouseColor(house: string): string {
    switch (house) {
      case 'Gryffindor': return '#7F0909';
      case 'Slytherin': return '#0D6217';
      case 'Hufflepuff': return '#EEE117';
      case 'Ravenclaw': return '#000A90';
      default: return '#666';
    }
  }
}
