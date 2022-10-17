import styles from "./header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <header className={styles.header_conteiner}>
        <div className={styles.header_logo}>
          <Image
            src="/images/logo.svg"
            alt="main logo"
            width={180}
            height={30}
          />
        </div>
        <div className={styles.header_menu}>
          <ul className={styles.header_menu_list}>
            <li className={(styles.header_menu_list_item, styles.logout)}>
              log out
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
