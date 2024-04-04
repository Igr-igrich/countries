import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CountriesApiService } from '../../shared/countries/countries-api.service';
import { ICities, ICountries } from '../../shared/countries/countries';
import { PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableCountriesComponent implements OnInit, AfterViewInit, OnChanges {
  displayedColumns: string[] = this.router.url == '/countries' ? ['wikiDataId', 'name', 'code', 'currencyCodes'] : ['country', 'name', 'region', 'latitude'];
  dataSource = new MatTableDataSource<ICountries | ICities>([]);
  filteredSource = new MatTableDataSource<ICountries | ICities>([]);

  pageEvent?: PageEvent;
  // datasource?: null;
  pageIndex?:number;
  pageSize:number = 5;
  length?:number;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private readonly countriesApiService: CountriesApiService,
    public router: Router,
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
    // console.log('init');
    // console.log(this.dataSource.data);
    
    
    if (this.router.url == '/countries') {
      this.countriesApiService.getCountries$().subscribe(data => {      
        this.dataSource.data = data.data
        this.filteredSource = this.dataSource
  
        this.length = data.metadata.totalCount;
      })
    } 
    // else {
    //   this.countriesApiService.getCities$().subscribe(data => {
    //     console.log('hi');
        
    //     this.dataSource.data = data.data;
    //     this.filteredSource = this.dataSource;
  
    //     this.length = data.metadata.totalCount;
    //   })
    // }
    
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

  @ViewChild(MatSort) sort: MatSort | null = null;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  navigate(country: string) {    
    

    this.countriesApiService.getCities$(country).subscribe(data => {
      this.router.navigate(['cities'])

      this.dataSource.data = data.data;
      this.filteredSource = this.dataSource;

      // console.log(this.dataSource.data);

      this.length = data.metadata.totalCount;
      
    })
  }

  public filterResults(text: string) {    
    // if(!text) {
    //   this.filteredSource = this.dataSource;
    // }
    const filterValue = text;

    this.dataSource.filter = text.trim().toLowerCase();

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public getServerData(event:PageEvent){
    this.countriesApiService.paginationCountries$(event).subscribe(
      response =>{
        console.log(response);
        
          this.dataSource.data = response.data;
          // this.pageIndex = response.pageIndex;
          // this.pageSize = response.pageSize;
          // this.length = response.metadata.totalCount;
      },
    );
    return event;
  }
}
