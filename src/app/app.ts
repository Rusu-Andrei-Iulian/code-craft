import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { CodeAnalyzer } from './components/code-analyzer/code-analyzer';

@Component({
  selector: 'app-root',
  imports: [Navbar, CodeAnalyzer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('codecraft');
}
