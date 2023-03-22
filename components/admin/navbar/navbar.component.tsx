import styles from './navbar.module.css';
import router from 'next/router';
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';
import bodyStyles from '../dashboard/dashboardbody/dashboardbody.module.css';
import { useEffect } from 'react';

const Navbar = (props: any) => {
  const onClickHendler = (e: any) => {
    if (e.currentTarget.classList.contains(styles.active)) {
      e.currentTarget.classList.remove(styles.active);
      props.setOpendMenuItem(null);
      props.setIsModalOpen(false);
    } else {
      let fetchUrl = null;
      switch (e.currentTarget.getAttribute('datatype')) {
        case 'our_users':
          fetchUrl = `/api/admin/users/getall/?token=${AES.decrypt(
            localStorage.getItem('_token'),
            'secretPassphrase'
          ).toString(enc.Utf8)}&from=${props?.from}&count=${props?.count}`;
          break;
        case 'complated_projects':
          fetchUrl = `/api/admin/projects/getall/?token=${AES.decrypt(
            localStorage.getItem('_token'),
            'secretPassphrase'
          ).toString(enc.Utf8)}&from=${props?.from}&count=${props?.count}`;
          break;
        case 'about_us':
          fetchUrl = `/api/admin/aboutus/get/?token=${AES.decrypt(
            localStorage.getItem('_token'),
            'secretPassphrase'
          ).toString(enc.Utf8)}`;
          break;
        case 'contact':
          fetchUrl = `/api/admin/contacts/get/?token=${AES.decrypt(
            localStorage.getItem('_token'),
            'secretPassphrase'
          ).toString(enc.Utf8)}`;
          break;
      }

      fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200 && data.resource && data.success) {
            props?.setPageData(data);
          } else {
            props?.setPageData(null);
            if (
              (!data.success && data.status === 401) ||
              (!data.success &&
                data.status === 404 &&
                data.message === 'User not found')
            ) {
              localStorage.removeItem('_token');
              router.push('/admin/login');
            }
          }
        })
        .catch((err) => {
          props.setPageData([]);
        });

      e.currentTarget.classList.add(styles.active);
      [...e.currentTarget.parentElement.children].forEach((el) => {
        if (el !== e.currentTarget) {
          el.classList.remove(styles.active);
        }
      });
      props.setOpendMenuItem(e.currentTarget);
      props.setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className={styles.navbar_conteiner}>
        <ul className={styles.navbar_menu_list}>
          <li
            className={styles.navbar_menu_list_item}
            onClick={onClickHendler}
            datatype="our_users"
          >
            <a>ჩვენი მომხმარებლები</a>
          </li>
          <li
            className={styles.navbar_menu_list_item}
            onClick={onClickHendler}
            datatype="complated_projects"
          >
            <a>დასრულებული პროექტები</a>
          </li>
          <li
            className={styles.navbar_menu_list_item}
            onClick={onClickHendler}
            datatype="about_us"
          >
            <a>ჩვენს შესახებ</a>
          </li>
          <li
            className={styles.navbar_menu_list_item}
            onClick={onClickHendler}
            datatype="contact"
          >
            <a>კონტაქტი</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
