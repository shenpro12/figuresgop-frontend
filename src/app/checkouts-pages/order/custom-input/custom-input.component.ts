import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent {
  @Input() name: string = '';
  @Input() header: string = '';
  @Input() require?: boolean = true;
  @Output() input = new EventEmitter();
  checkboxChange(e: any) {
    if (e.target.checked) {
      e.target.nextSibling.focus();
    }
    if (e.target.nextSibling.value) {
      e.target.checked = true;
    }
  }
  inputFocusOut(e: any) {
    if (!e.target.value) {
      e.target.previousSibling.checked = false;
    } else {
      e.target.previousSibling.checked = true;
    }
  }
  onInput(e: any) {
    this.input.emit(e.target.value);
  }
}
