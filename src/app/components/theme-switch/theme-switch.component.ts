import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {
  isDarkThemeActive: boolean = false;
  themeIcon: string = 'src/assets/icons/sun.svg';


  constructor(@Inject(DOCUMENT) private document: Document) {}

  onChange(newValue: boolean): void {
    if (newValue) {
      this.themeIcon = 'src/assets/icons/moon.svg';
      this.applyDarkTheme();
    } else {
      this.themeIcon = 'src/assets/icons/sun.svg';
      this.applyLightTheme();
    }
  }

  // Appliquer le thème sombre
  applyDarkTheme(): void {
    this.document.body.setAttribute('data-theme', 'dark');
  }

  // Appliquer le thème clair
  applyLightTheme(): void {
    this.document.body.removeAttribute('data-theme');
  }

  toggleTheme(): void {
    this.isDarkThemeActive = !this.isDarkThemeActive;
    this.onChange(this.isDarkThemeActive);
  }
}
