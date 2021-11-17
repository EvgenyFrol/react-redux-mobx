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
		if (!isUseLocalStorage) {
			dispatch(getUsers(activePage));
			setIsLoading(false);
			dispatch(setUsersInLocal(onTotal / onPerPage));
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
		setIsUseLocalstorage(Boolean(Number(event.target.value)));
	}, [isUseLocalStorage]);

	const changePaginate = useCallback((num: number) => {
		setActivePage(num);
	}, []);

	return (
		<div className={style.userList}>
			{loading && <h1>идет загрузка...</h1>}
			{error && <h1>{error}</h1>}
			<div onChange={onChangeValue}>
				<div>
					<label htmlFor="1">
						<input type="radio" id="1" value="1" name="useLocalStorage" />
            LocalStorage
					</label>
				</div>
				<div>
					<label htmlFor="0">
						<input type="radio" id="0" value="0" name="useLocalStorage" />
            API
					</label>
				</div>
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
