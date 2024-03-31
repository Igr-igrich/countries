import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CountriesApiService } from './shared/countries/countries-api.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { ICountries } from './shared/countries/countries';
import { CountriesStoreService } from './shared/countries/countries-store.service';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['wikiDataId', 'name', 'code', 'currencyCodes'];
  dataSource = new MatTableDataSource<ICountries>([]);
  filteredSource = new MatTableDataSource<ICountries>([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private readonly countriesApiService: CountriesApiService,
    // private readonly countriesStoreService: CountriesStoreService,
    // private readonly activatedRoute: ActivatedRoute,
  ) {}

  // readonly countries$ = this.activatedRoute.paramMap.pipe(
  //   tap(() => {
  //     this.countriesStoreService.loadCountries();
  //   }),
  //   switchMap(() => this.countriesStoreService.countries$)
  // )
  // this.countriesStoreService.countries$

  ngOnInit(): void {
    // console.log(this.countries$);
    
    this.countriesApiService.getCountries$().subscribe(data => {
      // this.countriesStore$.next(data.data),
      // console.log(this.countriesStore$)
      
      this.dataSource.data = data.data
      this.filteredSource = this.dataSource
    })
  }

  @ViewChild(MatSort) sort: MatSort | null = null;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public filterResults(text: string) {    
    // if(!text) {
    //   this.filteredSource = this.dataSource;
    // }
    const filterValue = text

    this.dataSource.filter = text.trim().toLowerCase();

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
