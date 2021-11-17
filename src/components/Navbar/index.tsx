import React from 'react';
import { Link } from 'react-router-dom';

import style from './Navbar.module.scss';

const links = [
	{
		title: 'Home',
		link: '/',
	},
	{
		title: 'Redux',
		link: '/pageredux',
	},
	{
		title: 'MobX',
		link: '/pagemobx',
	},
];

const Navbar: React.FC = () => {
	return (
		<nav className={style.navbar}>
			<ul className={style.navbar__links}>
				{links.map((item) => (
					<li className={style.navbar__link} key={item.link}>
						<Link to={item.link}>{item.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default React.memo(Navbar);
