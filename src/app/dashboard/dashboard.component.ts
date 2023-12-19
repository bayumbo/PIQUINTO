import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(private router: Router) { }

  onOptionSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    // Redirige a la ruta correspondiente según la opción seleccionada
    switch (selectedValue) {
      case 'opcion1':
        this.router.navigate(['']);
        break;
      case 'opcion2':
        this.router.navigate(['/panel/a']);
        break;
      default:
        break;
    }
  }

  wordList: string[] = ['deberes', 'notas', 'examenes', 'carreras', 'ingles', 'aula virtual', 'promedios', 'ingresar al aula virtual', 'ingresar a EVA', 'ingresar a SIGA'];
  typedText: string = '';
  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;

  onInputChange(): void {
    if (this.typedText.length > 0) {
      this.filteredSuggestions = this.wordList.filter(word =>
        word.toLowerCase().includes(this.typedText.toLowerCase())
      );
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
    }
  }

  selectSuggestion(suggestion: string): void {
    this.typedText = suggestion;
    this.showSuggestions = false;
  }
}