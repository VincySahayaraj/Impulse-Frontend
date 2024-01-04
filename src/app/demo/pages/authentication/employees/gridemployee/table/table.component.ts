import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';



interface Country {
	id?: number;
	name: string;
	empcode: string;
	designation: string;
	
}

const COUNTRIES: Country[] = [
	{
		name: 'Vincy',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	},
	{
		name: 'Afzal',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	},
	{
		name: 'Hari',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	},
	{
		name: 'Jijito',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	},
	{
		name: 'Shajith',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	},
	{
		name: 'Belbin',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	},
	{
		name: 'Bench',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	},
	{
		name: 'Ferdinand',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	},
	{
		name: 'Abish',
		empcode: 'f/f3/Flag_of_Russia.svg',
		designation: 'software developer',
	}
];
@Component({
  selector: 'app-table',
  
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // imports: [DecimalPipe, NgFor, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export default class TableComponent implements OnInit  {
  tableData: any[] = [
    { id: 1, name: 'John Doe', age: 30, occupation: 'Developer' },
    { id: 2, name: 'Jane Smith', age: 25, occupation: 'Designer' },
    // Add more rows as needed
  ];
 ngOnInit(): void {
   
 }
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 5;

  getTotalPages(): number {
    return Math.ceil(this.tableData.length / this.itemsPerPage);
  }

  // Get the current page's data based on the itemsPerPage and currentPage
  getCurrentPageData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
   
    return this.tableData.slice(startIndex, endIndex);
  }

  // Change the current page
  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPages()) {
      this.currentPage = pageNumber;
    }
  }

  page = 1;
	pageSize = 4;
	collectionSize = COUNTRIES.length;
	countries: Country[];

	constructor() {
		this.refreshCountries();
	}

	refreshCountries() {
		this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

}








