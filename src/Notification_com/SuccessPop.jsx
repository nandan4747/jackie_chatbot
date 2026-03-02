import styles from './styles.module.css'
export const SuccessPop = ({message = "message"})=>{
    return <div className={styles.container}>
       <div className={styles.divider}></div>  <p>success</p>
       <div className={styles.svgg}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
       </div>
       <div><p>{message}</p></div>
    </div>
}