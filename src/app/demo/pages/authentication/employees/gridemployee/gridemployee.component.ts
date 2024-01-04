
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gridemployee',
  templateUrl: './gridemployee.component.html',
  styleUrls: ['./gridemployee.component.scss'],
})
export default class GridemployeeComponent {

  dataSource : any;
  dtOptions: DataTables.Settings = {};
  tablevalue:any;
  @Input() employeeData:any[]=Array();

 ngOnInit(): void {

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
    responsive:true
    };

    this.getEmployeeFromParent();
 }

 getEmployeeFromParent(){

  console.log("data",this.employeeData)

 }


}
