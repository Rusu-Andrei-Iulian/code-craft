import { Component, inject, Input } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const SUCCESS_ICON = `
<svg class="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
`

const ERROR_ICON = `
<svg class="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

`;

const SUGGESTION_ICON = `
<svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m5 4-2 2 2 2m4-4 2 2-2 2m5-12v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
</svg>

`;

const WARNING_ICON = `
<svg class="w-6 h-6 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

`

@Component({
  selector: 'app-result-card',
  imports: [MatIconModule],
  templateUrl: './result-card.html',
  styleUrl: './result-card.css'
})

export class ResultCard {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() type: 'warning' | 'error' | 'suggestion' | 'success' = 'suggestion';
  @Input() line: string = '';

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral('success', sanitizer.bypassSecurityTrustHtml(SUCCESS_ICON));
    iconRegistry.addSvgIconLiteral('error', sanitizer.bypassSecurityTrustHtml(ERROR_ICON));
    iconRegistry.addSvgIconLiteral('suggestion', sanitizer.bypassSecurityTrustHtml(SUGGESTION_ICON));
    iconRegistry.addSvgIconLiteral('warning', sanitizer.bypassSecurityTrustHtml(WARNING_ICON));
  }

  getBackgroundColor(): string {
    switch (this.type) {
      case 'warning':
        return 'bg-yellow-500 border-yellow-500';
      case 'error':
        return 'bg-red-500 border-red-500';
      case 'suggestion':
        return 'bg-gray-500 border-gray-500';
      case 'success':
        return 'bg-green-500 border-green-500';
      default:
        return 'bg-gray-500 border-gray-500';
    }
  }

  getIconName(): string {
    return this.type;
  }
}
