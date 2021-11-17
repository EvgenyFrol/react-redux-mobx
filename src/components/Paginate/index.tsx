import React, { useState } from 'react';
import cn from 'classnames';

import style from './Paginate.module.scss';

type PaginateData = {
  perPage: number,
  total: number,
  onChange: (arg0: number) => void,
}

const Paginate: React.FC<PaginateData> = ({
  perPage, total, onChange,
}) => {
  const pageNumber: number[] = [];
  const [isActive, setIsActive] = useState<number>(1);

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumber.push(i);
  }

  const changeData: any = (num: number) => {
    onChange(num);
    setIsActive(num);
  };

  return (
    <div className={style.paginate}>
      <ul className={style.paginate__items}>
        {pageNumber.map((number, i) => (
          <li className={cn(style.paginate__item, (i + 1) === isActive && style.paginate__active)} key={number}>
            <span className={style.paginate__button} onClick={() => changeData(number)}>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Paginate);
