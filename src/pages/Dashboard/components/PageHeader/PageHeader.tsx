import UserProfileCard from "../UserProfileCard"
import styles from "./pageheader.module.css"

export default function PageHeader() {
    return (
        <div className={styles.page_header}>
            <div className={styles.search_bar}>

            </div>

            <UserProfileCard
                extraStyles={styles.user_profile}
            />
        </div>
    )
}