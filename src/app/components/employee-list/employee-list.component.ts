import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];  // Déclaration de la variable avec le type

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getData().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      },
      complete: () => {
        console.log('Requête terminée');
      }
    });
  }
}
