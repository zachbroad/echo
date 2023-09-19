import { NavLink } from "react-router-dom";
import styles from './bottomnav.module.scss';

function BottomNav() {
  return (
    <div className={styles.bottomNavigation}>
      <NavLink to={"/"}>
        {({ isActive, isPending }) => (
          <div className={`${styles.item} ${isActive ? styles.active : ""} ${isPending ? styles.pending : ""}`}>
            <i className="bi bi-house"></i>
            {/*Home*/}
          </div>
        )}
      </NavLink>

      <NavLink to={"/explore/"}>
        {({ isActive, isPending }) => (
          <div className={`${styles.item} ${isActive ? styles.active : ""} ${isPending ? styles.pending : ""}`}>
            <i className="bi bi-search"></i>
            {/*Explore*/}
          </div>
        )}
      </NavLink>

      <NavLink to={"/dashboard/"}>
        {({ isActive, isPending }) => (
          <div className={`${styles.item} ${isActive ? styles.active : ""} ${isPending ? styles.pending : ""}`}>
            <i className="bi bi-person"></i>
            {/*Dashboard*/}
          </div>
        )}
      </NavLink>
    </div>
  )
}

export default BottomNav;
