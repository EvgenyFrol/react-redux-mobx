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
	isLoadData: boolean = false;

  constructor() {
  	makeAutoObservable(this);
  }

  getUsersFromApi = (page: number) => {
		if (!this.isLoadData) {
			axios.get(`https://reqres.in/api/users?page=${page}`).then((res) => {
				this.data = res.data.data;
				this.page = res.data.page;
				this.perPage = res.data.per_page;
				this.total = res.data.total;
				this.totalPages = res.data.total_pages;
			});
		}
  };

  saveUsersForLocalStore = () => {
  	for (let i = 1; i <= Math.ceil(this.total / this.perPage); i++) {
  		axios.get(`https://reqres.in/api/users?page=${i}`).then((res) => {
  			localStorage.setItem(`${i}`, JSON.stringify(res.data.data));
  		});
  	}
		// eslint-disable-next-line no-alert
		if (this.isLoadData) alert('Данные загружены');
  };

  getUsersFromLocalStorage = (page: number) => {
  	const saveLocal = localStorage.getItem(`${page}`);
  	if (saveLocal) {
  		this.data = JSON.parse(saveLocal);
  	}
  }

  onChangeValue = (event: any) => {
  	this.isLoadData = event;
  };

  changePaginate = (num: number) => {
  	if (this.isLoadData) {
  		this.activePage = num;
  	} else {
  		this.getUsersFromApi(num);
  	}
  }

  getData = () => {
  	if (this.isLoadData) {
  		this.getUsersFromLocalStorage(this.activePage);
  	} else {
  		this.getUsersFromApi(this.activePage);
  	}
  }
}

export default new Users();
