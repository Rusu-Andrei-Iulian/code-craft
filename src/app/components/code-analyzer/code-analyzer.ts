import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ResultCard } from '../result-card/result-card';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    puter: any;
  }
}

interface IResult {
  title: string;
  type: 'warning' | 'error' | 'suggestion' | 'success';
}


interface IResponse {
  result: IResult[];
  numberOfLines: string;
  numberOfCharacters: string;
  numberOfErrors: string;
  numberOfWarnings: string;
  numberOfSuccesess: string;
}

@Component({
  selector: 'app-code-analyzer',
  imports: [MatTabsModule, ResultCard, FormsModule],
  templateUrl: './code-analyzer.html',
  styleUrl: './code-analyzer.css'
})
export class CodeAnalyzer {
  textAreaContent: string = `function calculateSum(a, b) {
  var result = a + b;
  return result;
}

// Example usage
calculateSum(5, 3);
  `;

  disabledButton: boolean = false;
  data: IResponse | null = null;
  constructor() { }

  formatCode() {
    this.disabledButton = true;
    window.puter.ai.chat("Format this code, and just return the code, no other words" + this.textAreaContent, { model: "gpt-5-nano" })
      .then(response => {
        this.textAreaContent = response.message.content;
        this.disabledButton = false;
      });
  }

  analyzeCode() {
    this.disabledButton = true;
    window.puter.ai.chat("Analyze this code for errors, warnings and suggestions, and return a json with the following structure { result: [ { title: string, type: 'warning' | 'error' | 'suggestion' | 'success' } ], numberOfLines: string, numberOfCharacters: string, numberOfErrors: string, numberOfWarnings: string, numberOfSuccesess: string } " + this.textAreaContent, { model: "gpt-5-nano" })
      .then((response: any) => {
        this.data = JSON.parse(response.message.content);
        this.disabledButton = false;
      });
  }
}
