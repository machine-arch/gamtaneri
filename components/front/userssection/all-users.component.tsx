import { FC, useContext, useEffect, useRef, useState } from 'react';
import { localeContext } from '../../../context/locale-context';
import styles from './all-users.module.css';
import { createDate, httpRequest } from '../../../utils/app.util';
import { dataContext } from '../../../context/data.context';
import Image from 'next/image';
import { imageLoaderProp } from '../../../utils/app.util';

const AllUsers: FC<any> = (props: any) => {
  const { state, dispatch } = useContext<any>(dataContext);
  const from = useRef(10);
  const count = useRef(10);
  const wasFatcched = useRef(false);
  const wasSearch = useRef(false);
  const { localeKey } = useContext<any>(localeContext);
  const [searchVal, setSearchVal] = useState<string>('');

  useEffect(() => {
    document.addEventListener('scroll', getMooreUsers);
  }, []);

  const controlSearchFild = (e: any) => {
    setSearchVal(e.currentTarget.value);
  };

  const searchUsers = async () => {
    if (searchVal.length < 2) return;
    httpRequest(
      `http://localhost:3000/api/client/users/search?search=${searchVal}`,
      'GET'
    )
      .then((res) => {
        dispatch({ type: 'SET_USERS_ONLOAD', payload: res?.resource });
        wasSearch.current = true;
        return res;
      })
      .then((res) => {
        if (res?.count > from.current) {
          wasFatcched.current = false;
        } else {
          window.removeEventListener('scroll', () => {});
          return false;
        }
      });
  };

  const clearSearch = () => {
    httpRequest(
      `http://localhost:3000/api/client/users/getall?from=${0}&count=${10}`,
      'GET'
    )
      .then((res) => {
        dispatch({
          type: 'SET_USERS_ONLOAD',
          payload: res?.resource,
        });
        wasSearch.current = false;
        return res;
      })
      .then((res) => {
        if (res?.count > from.current) {
          wasFatcched.current = false;
        } else {
          window.removeEventListener('scroll', () => {});
          return false;
        }
      });
  };

  const getMooreUsers = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !wasFatcched.current
    ) {
      wasFatcched.current = true;
      httpRequest(
        `http://localhost:3000/api/client/users/getall?from=${from.current}&count=${count.current}`,
        'GET'
      )
        .then((res) => {
          dispatch({ type: 'SET_USERS', payload: res?.resource });
          from.current += count.current;
          return res;
        })
        .then((res) => {
          if (res?.total > from.current) {
            wasFatcched.current = false;
          } else {
            window.removeEventListener('scroll', () => {});
            return false;
          }
        });
    }
  };

  return (
    <div className={styles.all_users_conteiner}>
      <div className={styles.all_users_filter_conteiner}>
        <input
          type="text"
          name="user_filter"
          className="user_filter"
          placeholder="მოძებნე სახელით ან თარიღით..."
          onChange={controlSearchFild}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              searchUsers();
            }
            if (
              (event.key === 'Backspace' || event.key === 'Delete') &&
              wasSearch.current
            ) {
              if (searchVal.length <= 1) clearSearch();
            }
          }}
          onCut={() => {
            if (wasSearch.current) {
              if (searchVal.length <= 1) clearSearch();
            }
          }}
        />
        <div className={styles.search_ico_conteiner} onClick={searchUsers}>
          <Image
            className={styles.search_ico}
            src="/images/search-ico.svg"
            alt="search icon"
            width={15}
            height={15}
            loader={imageLoaderProp}
          />
        </div>
      </div>
      <div className={styles.all_users_cards_conteiner}>
        {state.users.map((user: any) => {
          return (
            <div key={user.id} className={styles.user_card}>
              <div className={styles.user_name_conteiner}>
                <h1 className={styles.user_name}>
                  {localeKey === 'en' ? user?.title_eng : user?.title}
                </h1>
              </div>
              <div className={styles.user_cooperation_date_conteiner}>
                <span className={styles.user_cooperation_date}>
                  {createDate(user?.createdAt)}
                </span>
              </div>
              <div className={styles.user_cooperation_description_conteiner}>
                <span className={styles.user_cooperation_description}>
                  {localeKey === 'en'
                    ? user?.description
                    : user?.description_eng}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
