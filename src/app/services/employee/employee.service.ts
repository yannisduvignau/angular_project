import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;

  // Données simulées (brutes) en cas d'échec de l'API
  private mockEmployees: Employee[] = [
    { id: 1, name: 'John Doe', position: 'Developer', department: 'IT' },
    { id: 2, name: 'Jane Smith', position: 'Manager', department: 'HR' },
    { id: 3, name: 'Bob Johnson', position: 'Designer', department: 'Marketing' }
  ];

  constructor(private http: HttpClient) {}

  // Méthode GET avec gestion d'erreur et retour des données simulées en cas d'échec
  getData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        // Retour des données simulées en cas d'erreur
        return of(this.mockEmployees);  // `of` crée un Observable avec les données simulées
      })
    );
  }

  // Méthode POST
  postData(employee: Employee[]): Observable<Employee[]> {
    return this.http.post<Employee[]>(`${this.apiUrl}/employees`, employee).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'envoi des données:', error);
        return of([]);  // Retourner un tableau vide en cas d'erreur
      })
    );
  }

  // Méthode PUT
  updateData(id: number, employee: Employee[]): Observable<Employee[]> {
    return this.http.put<Employee[]>(`${this.apiUrl}/employees/${id}`, employee).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour des données:', error);
        return of([]);  // Retourner un tableau vide en cas d'erreur
      })
    );
  }

  // Méthode DELETE
  deleteData(id: number): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`${this.apiUrl}/employees/${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression des données:', error);
        return of([]);  // Retourner un tableau vide en cas d'erreur
      })
    );
  }
}
