import styles from "./staffprofilenavigation.module.css";

interface navItemsType {
  label: string;
  path: string;
  active: boolean;
}

export default function StaffProfileNavigation({
  navItems,
  changeNav,
}: {
  navItems: navItemsType[];
  changeNav: (index: number) => void;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className={styles.staff_profile_header}>
        {navItems.map((navItem: navItemsType, index: number) => {
          return (
            <div
              key={navItem.label}
              className={`
                                        ${styles.nav_item}
                                        ${navItem.active ? styles.active : null}
                                    `}
              onClick={() => changeNav(index)}
            >
              {navItem.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
