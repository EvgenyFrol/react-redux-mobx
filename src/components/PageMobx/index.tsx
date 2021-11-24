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

	useEffect(() => {
		users.saveUsersForLocalStore();
	}, [users.isLoadData]);

	return (
		<div className={style.userList}>
			<div>
				<button type="button" aria-label="hidden" onClick={() => users.onChangeValue(true)} disabled={users.isLoadData}>
					Оффлайн
				</button>
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
