import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HarrypotterService } from '../../services/harrypotter';
import { Character } from '../../models/character';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.scss',
})
export class Characterlist implements OnInit {
  characters: Character[] = [];
  loading = true;

  constructor(
    private hpService: HarrypotterService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.hpService.getAllCHaracters().subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
        this.cdr.detectChanges(); // Ensure view updates after data is loaded
      },
      error: (err) => {
        console.error('Error fetching characters:', err);
        this.loading = false;
        this.cdr.detectChanges(); // Ensure view updates after error
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/character', id]);
  }

  getHouseColor(house: string): string {
    switch (house.toLowerCase()) {
      case 'Gryffindor': return '#7F0909';
      case 'Slytherin': return '#0D6217';
      case 'Hufflepuff': return '#EEE117';
      case 'Ravenclaw': return '#000A90';
      default: return '#666';
    }
  }

}
