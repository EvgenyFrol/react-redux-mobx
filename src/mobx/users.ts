import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { UserType } from '../types/types';

class Users {
  data: UserType[] = [];
  page: number = 0;
  perPage: number = 0;
  total: number = 0;
  totalPages: number = 0;
  isUseLocalStorage: boolean = false;
  activePage: number = 1;

  constructor() {
  	makeAutoObservable(this);
  }

  getUsersFromApi = (page: number) => {
  	axios.get(`https://reqres.in/api/users?page=${page}`).then((res) => {
  		this.data = res.data.data;
  		this.page = res.data.page;
  		this.perPage = res.data.per_page;
  		this.total = res.data.total;
  		this.totalPages = res.data.total_pages;
  	});
  	this.saveUsersForLocalStore();
  };

  saveUsersForLocalStore = () => {
  	for (let i = 1; i <= Math.ceil(this.total / this.perPage); i++) {
  		axios.get(`https://reqres.in/api/users?page=${i}`).then((res) => {
  			localStorage.setItem(`${i}`, JSON.stringify(res.data.data));
  		});
  	}
  };

  getUsersFromLocalStorage = (page: number) => {
  	const saveLocal = localStorage.getItem(`${page}`);
  	if (saveLocal) {
  		this.data = JSON.parse(saveLocal);
  	}
  }

  onChangeValue = (event: any) => {
  	this.isUseLocalStorage = Boolean(Number(event.target.value));
  };

  changePaginate = (num: number) => {
  	if (this.isUseLocalStorage) {
  		this.activePage = num;
  	} else {
  		this.getUsersFromApi(num);
  	}
  }

  getData = () => {
  	if (this.isUseLocalStorage) {
  		this.getUsersFromLocalStorage(this.activePage);
  	} else {
  		this.getUsersFromApi(this.activePage);
  	}
  }
}

export default new Users();
