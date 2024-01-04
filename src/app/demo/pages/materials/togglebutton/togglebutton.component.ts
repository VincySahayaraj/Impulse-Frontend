import { Component, EventEmitter, Input, Output } from '@angular/core';
import ViewemployeeComponent from '../../authentication/employees/viewemployee/viewemployee.component';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './togglebutton.component.html',
  styleUrls: ['./togglebutton.component.scss']
})
export class TogglebuttonComponent {

  @Input() tableView: any
  @Output() myOutput: EventEmitter<string> = new EventEmitter();
  outputMessage: any;

  constructor(private viewemployee: ViewemployeeComponent) {

  }

  onToggleChange(checked: any) {

    // Your logic when the toggle button is clicked
    console.log('Toggle state: ' + checked);
    if (this.viewemployee.tableView == undefined) {
      this.tableView = true;
      this.outputMessage = this.tableView;
    }
    if (this.viewemployee.tableView == true) {
      this.tableView = false;
      this.outputMessage = this.tableView;
    }
    else{
      this.tableView = true;
      this.outputMessage = this.tableView;
    }
    this.myOutput.emit(this.outputMessage);
  }
}
