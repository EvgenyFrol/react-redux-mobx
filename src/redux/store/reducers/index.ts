import { combineReducers } from 'redux';
import { useReduser } from './useReduser';

export const rootReducer = combineReducers({
	user: useReduser,
});

export type RootState = ReturnType<typeof rootReducer>
