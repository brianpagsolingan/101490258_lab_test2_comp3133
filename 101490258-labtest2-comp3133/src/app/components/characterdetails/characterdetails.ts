import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HarrypotterService } from '../../services/harrypotter';
import { Character } from '../../models/character';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.scss',
})
export class Characterdetails implements OnInit {
  character: Character | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private hpService: HarrypotterService,
    private router: Router
  ){}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id) {
        this.hpService.getCharacterById(id).subscribe({
          next: (data) => {
            this.character = data.length > 0 ? data[0] : null;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching character details:', err);
            this.loading = false;
          }
        });
      }
  }

  goBack(): void {
    this.router.navigate(['/']);
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
