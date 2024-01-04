import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
@Component({
  selector: 'app-salaryslab',
  templateUrl: './salaryslab.component.html',
  styleUrls: ['./salaryslab.component.scss']
})
export class SalaryslabComponent {

  salarySlabForm: FormGroup;
  isDisabled:any=true;

  @Input() pfExempt: any;
  @Output() myOutput: EventEmitter<string> = new EventEmitter();
  outputMessage: any;

  onpfExemptChange(checked: any) {

    // Your logic when the toggle button is clicked
    console.log('Toggle state: ' + checked.valuee);

    this.pfExempt = true;
    console.log("pfff", this.pfExempt)
    this.outputMessage = this.pfExempt;

    this.myOutput.emit(this.outputMessage);
  }

  onesiExemptChange(checked: any) {
    // Your logic when the toggle button is clicked
    console.log('Toggle state: ' + checked.valuee);

    this.pfExempt = true;
    console.log("pfff", this.pfExempt)
    this.outputMessage = this.pfExempt;

    this.myOutput.emit(this.outputMessage);
  }

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.salarySlabForm = this.fb.group({
      slabName:[""],
      pfExempt:[""],
      esiExempt:[""],
      basic:[""],
      hra:[""],
      livingAllowance:[""],
      conveyanceAllowance:[""],
      productionAllowance:[""],
      medicalAllowance:[""],
      grossPay:[{value: '', disabled: true }],
      employeePF:[{value: '', disabled: true }],
      employeeESI:[{value: '', disabled: true }],
      employerPF:[{value: '', disabled: true }],
      employerESI:[{value: '', disabled: true }],
      totalDeduction:[{value: '', disabled: true }],
      netPay:[{value: '', disabled: true }],
      annualBonus:[{value: '', disabled: true }],
      ctc:[ {value: '', disabled: true }]





    })
  }

  togglechangeDisable(){
    const control = this.salarySlabForm.get('annualBonus');
    if (control) {
      if (!control.disabled) {
        console.log("valuee enable")
        control.disable();
      } else {
        console.log("valuee disable")
        
        control.enable();
      }
    }
  }

  salarySlabSubmit() {
console.log("salary slab",this.salarySlabForm.value)

  

  }


}
