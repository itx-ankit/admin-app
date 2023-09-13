import { ITableData } from './shared/Interface/ITableData';
import { IUserData } from './shared/Interface/IUserData';

export const ELEMENT_DATA: ITableData[] = [
  { index: 1, name: 'Amit', 'Phone no.': 284561299 },
  { index: 2, name: 'Sumit', 'Phone no.': 437340026 },
  { index: 3, name: 'Raj', 'Phone no.': 650683941 },
  { index: 4, name: 'Aman', 'Phone no.': 929470122 },
  { index: 5, name: 'Harry', 'Phone no.': 1048585811 },
  { index: 6, name: 'Hitesh', 'Phone no.': 1239580107 },
  { index: 7, name: 'Saurabh', 'Phone no.': 144850067 },
  { index: 8, name: 'Naveen', 'Phone no.': 1559499994 },
  { index: 9, name: 'Manu', 'Phone no.': 183949984 },
  { index: 10, name: 'Alok', 'Phone no.': 20334797 },
];

export const USER_LIST_DATA: IUserData[] = [
  {
    userName: 'admin',
    password: 'admin',
    isUserAdmin: true,
  },
  {
    userName: 'user',
    password: 'user',
    isUserAdmin: false,
  },
];
