import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface CustomTableItem {
  name: string;
  id: number;
  atomic_number: number;
  symbol: string;
}

// TODO: replace this with real data from your application
//we could fetch data for the table obv
const EXAMPLE_DATA: CustomTableItem[] = [
  { id: 1, name: 'Hydrogen', atomic_number: 1, symbol: 'H' },
  { id: 2, name: 'Helium', atomic_number: 2, symbol: 'He' },
  { id: 3, name: 'Lithium', atomic_number: 3, symbol: 'Li' },
  { id: 4, name: 'Beryllium', atomic_number: 4, symbol: 'Be' },
  { id: 5, name: 'Boron', atomic_number: 5, symbol: 'B' },
  { id: 6, name: 'Carbon', atomic_number: 6, symbol: 'C' },
  { id: 7, name: 'Nitrogen', atomic_number: 7, symbol: 'N' },
  { id: 8, name: 'Oxygen', atomic_number: 8, symbol: 'O' },
  { id: 9, name: 'Fluorine', atomic_number: 9, symbol: 'F' },
  { id: 10, name: 'Neon', atomic_number: 10, symbol: 'Ne' },
  { id: 11, name: 'Sodium', atomic_number: 11, symbol: 'Na' },
  { id: 12, name: 'Magnesium', atomic_number: 12, symbol: 'Mg' },
  { id: 13, name: 'Aluminum', atomic_number: 13, symbol: 'Al' },
  { id: 14, name: 'Silicon', atomic_number: 14, symbol: 'Si' },
  { id: 15, name: 'Phosphorus', atomic_number: 15, symbol: 'P' },
  { id: 16, name: 'Sulfur', atomic_number: 16, symbol: 'S' },
  { id: 17, name: 'Chlorine', atomic_number: 17, symbol: 'Cl' },
  { id: 18, name: 'Argon', atomic_number: 18, symbol: 'Ar' },
  { id: 19, name: 'Potassium', atomic_number: 19, symbol: 'K' }
];

/**
 * Data source for the CustomTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CustomTableDataSource extends DataSource<CustomTableItem> {
  data: CustomTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CustomTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}
  // so you could I guess clean up http conncetions or even socket connections if the table is being updated in real time

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: CustomTableItem[]): CustomTableItem[] {
    // very simple client side pagination logic
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CustomTableItem[]): CustomTableItem[] {
    // and very simple sort logic
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        // this is changing the symbol btw, just converting each minus into a plus
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'atomic_number':
          return compare(+a.id, +b.id, isAsc);
        case 'symbol':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }

  insertRow(name: string, atomic_number: number, symbol: string) {
    const lastElement = this.data.pop();
    this.data.push(lastElement!)

    const updatedData = this.data

    updatedData.push({
      id: this.data.length === 0 ? 1 : lastElement!.id + 1,
      name,
      atomic_number,
      symbol,
    });
    this.data = updatedData

  }
  deleteRow(id: number) {
    this.data = this.data.filter((element) => element.id !== id);
  }
  updateRow(id: number) {
    // gonna think about this one
    // because state mutability might be a factor here
    // just give me a minute
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
