import { Component, OnInit } from '@angular/core';

import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { ApiService } from 'src/app/services/api.service';

interface DataItem {
  id: string;
  businessName: string;
  businessType: string;
  longitude: string;
  latitude: string;
  contactPersonName: string;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  createdOn: string;
  updatedOn: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn<DataItem> | null;
  filterMultiple?: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
})
export class BusinessListComponent implements OnInit {
  isLoading = true;
  listOfColumns: ColumnItem[] = [
    {
      name: 'Business Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) =>
        a.businessType.localeCompare(b.businessType),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Business Type',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) =>
        a.businessType.localeCompare(b.businessType),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { value: 'restaurant', text: 'Restaurant' },
        { value: 'hotel', text: 'Hotels' },
        { value: 'food court', text: 'Food Courts' },
        { value: 'grocery store', text: 'Grocery Store' },
        // { text: 'Jim', value: 'Jim', byDefault: true },
      ],
      filterFn: (list: string[], item: DataItem) =>
        list.some(
          (businessType) => item.businessType.indexOf(businessType) !== -1
        ),
    },
    {
      name: 'Contact Person Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) =>
        a.businessType.localeCompare(b.businessType),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Phone Number',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) =>
        a.businessType.localeCompare(b.businessType),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Email Address',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) =>
        a.businessType.localeCompare(b.businessType),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Registered On',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) =>
        a.businessType.localeCompare(b.businessType),
      sortDirections: ['ascend', 'descend', null],
    },
  ];
  listOfData: DataItem[] = [];

  ngOnInit(): void {
    this.apiServices.getBusiness().subscribe(
      (response: any) => {
        console.log(response);
        this.listOfData = response?.data;
      },
      (error) => console.log(error),
      () => (this.isLoading = false)
    );
  }

  constructor(private apiServices: ApiService) {}
}
