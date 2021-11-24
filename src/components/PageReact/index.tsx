/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypeSelector';
import { getUsers, setUsersInLocal } from '../../redux/store/action-creators/users';
import { UserType } from '../../types/types';
import Paginate from '../Paginate';

import style from './PageReact.module.scss';

const PageReact: React.FC = () => {
	const {
		users, error, loading, total, perPage,
	} = useTypedSelector((state) => state.user);
	const dispatch = useDispatch();
	const [isUseLocalStorage, setIsUseLocalstorage] = useState<boolean>(false);
	const [activePage, setActivePage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [localUser, setLocalUser] = useState();
	const [data, setData] = useState<UserType[] | any[]>();
	const [onPerPage, setOnPerPage] = useState<number>(0);
	const [onTotal, setOnTotal] = useState<number>(0);

	useEffect(() => {
		if (total) {
			setOnTotal(total);
		}
	}, [total]);

	useEffect(() => {
		if (perPage) {
			setOnPerPage(perPage);
		}
	}, [perPage]);

	useEffect(() => {
		dispatch(setUsersInLocal(onTotal / onPerPage));
	}, []);

	useEffect(() => {
		if (!isUseLocalStorage) {
			dispatch(getUsers(activePage));
			setIsLoading(false);
		}
	}, [isUseLocalStorage, activePage]);

	useEffect(() => {
		// @ts-ignore
		setLocalUser(JSON.parse(localStorage.getItem(activePage.toString())!));
	}, [activePage, localStorage]);

	useEffect(() => {
		if (isUseLocalStorage) {
			// @ts-ignore
			if (localUser) {
				setData(localUser);
			}
		} else {
			setData(users);
		}
	}, [isUseLocalStorage, users, localUser]);

	const onChangeValue = useCallback((event) => {
		setIsUseLocalstorage(event);
		alert('ДАнные загружены!');
	}, [isUseLocalStorage]);

	const changePaginate = useCallback((num: number) => {
		setActivePage(num);
	}, []);

	return (
		<div className={style.userList}>
			{loading && <h1>идет загрузка...</h1>}
			{error && <h1>{error}</h1>}
			<div>
				<button type="button" aria-label="hidden" onClick={() => onChangeValue(true)} disabled={isUseLocalStorage}>
					Оффлайн
				</button>
			</div>
			{!isLoading && (
				<div className={style.userList__container}>
					{(data as UserType[] || []).map((el: UserType) => (
						<div className={style.userList__user} key={el.first_name}>
							<div className={style.userList__avatar}>
								<img src={el.avatar} alt={el.first_name} />
							</div>
							<div className={style.userList__info}>
								<div className={style.userlist__name}>
									{`${el.first_name} ${el.last_name}`}
								</div>
								<div className={style.userlist__email}>
									{el.email}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<div className={style.userList__pagination}>
				<Paginate perPage={onPerPage} total={onTotal} onChange={changePaginate} />
			</div>
		</div>
	);
};

export default React.memo(PageReact);
