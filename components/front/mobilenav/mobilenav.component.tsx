import Styles from './mobilenav.module.scss';

const mobileNav = () => {
  return (
    <div className={Styles.mobilenav_conteiner}>
      <div className={Styles.mobilenav_body}>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
