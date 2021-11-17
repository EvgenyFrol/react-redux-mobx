import axios from 'axios';
import { Dispatch } from 'redux';
import {
	FETCH_USERS, FETCH_USER_SUCCESS, FETCH_USER_ERROR,
} from '../reducers/useReduser';

import { UserAction } from '../../../types/types';

export const getUsers = (page: number) => async (dispatch: Dispatch<UserAction>) => {
	try {
		dispatch({ type: FETCH_USERS });
		await axios.get(`https://reqres.in/api/users?page=${page}`).then((res) => {
			dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
		});
	} catch (e) {
		dispatch({
			type: FETCH_USER_ERROR,
			payload: 'Ошибка при загрузке данных',
		});
	}
};

export const setUsersInLocal = (pages: number) => async (dispatch: Dispatch<UserAction>) => {
	try {
		for (let i = 1; i <= pages; i++) {
			axios.get(`https://reqres.in/api/users?page=${i}`)
				.then((res) => {
					localStorage.setItem(`${i}`, JSON.stringify(res.data.data));
				});
		}
	} catch (e) {
		dispatch({
			type: FETCH_USER_ERROR,
			payload: 'Ошибка при загрузке данных',
		});
	}
};
