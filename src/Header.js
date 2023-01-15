import styles from './styles/header.module.css';
import { MdLogout, MdOutlineLogout } from 'react-icons/md';
import { Link } from "react-router-dom";
import { getUser } from "./utils";


function Header() {
  function logout() {
    localStorage.clear()
    window.location.href = "/login";
  }

  const userData = JSON.parse(localStorage.getItem('userData'))


  return (
    <header className={styles.header}>
      <div className={styles.inner_header}>
        <div className={styles.header_content}>
          <div className={styles.tab_div}>
            <img src='/images/logo.svg' className={styles.logo}></img>
            {userData.role === 'Recruter' ?
              <Link to='/myVacancies' className={styles.link}>
                <p className={styles.vacancy_tab}>Мої вакансії</p>
              </Link> :
              <Link to='/' className={styles.link}>
                <p className={styles.vacancy_tab}>Вакансії</p>
              </Link>
            }

          </div>

          <div className={styles.user_div}>
            <img src={`http://localhost:5000/${userData.avatar}`} className={styles.user_photo}></img>
            <div className={styles.user_info}>
              <div className={styles.user_fullname}>
                <p className={styles.user_name}>{userData.username}</p>
                {/* <p className={styles.user_lastname}>Vivcharuk</p> */}
              </div>
              <p className={styles.user_email}>{userData.email}</p>
            </div>
            <MdOutlineLogout size={26} onClick={() => logout()} />

          </div>

        </div>


      </div>
    </header>
  );
}

export default Header;
