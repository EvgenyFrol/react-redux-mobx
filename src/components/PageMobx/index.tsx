/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { UserType } from '../../types/types';
import Paginate from '../Paginate';
import users from '../../mobx/users';

import style from './PageMobx.module.scss';

const PageMobX: React.FC = observer(() => {
	useEffect(() => {
		users.getData();
	}, [users.isUseLocalStorage, users.activePage]);

	return (
		<div className={style.userList}>
			<div onChange={users.onChangeValue}>
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
			<div className={style.userList__container}>
				{users.data.map((el: UserType) => (
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
			<div className={style.userList__pagination}>
				<Paginate perPage={users.perPage} total={users.total} onChange={users.changePaginate} />
			</div>
		</div>
	);
});

export default React.memo(PageMobX);
