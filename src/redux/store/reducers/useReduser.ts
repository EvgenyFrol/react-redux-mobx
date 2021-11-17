import { UserState, UserAction } from '../../../types/types';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const initialState: UserState = {
	users: [],
	loading: false,
	error: null,
	localUsers: [],
};

export const useReduser = (state = initialState, action: UserAction) => {
	switch (action.type) {
		case FETCH_USERS:
			return {
				loading: true, error: false, users: [], localUsers: [],
			};
		case FETCH_USER_SUCCESS:
			return {
				loading: false,
				error: false,
				users: action.payload.data,
				total: action.payload.total,
				perPage: action.payload.per_page,
				localUsers: [],
			};
		case FETCH_USER_ERROR:
			return {
				loading: false, error: action.payload, users: [], localUsers: [],
			};
		default:
			return state;
	}
};
