import styles from "./styles.module.css";
export const Failure = ({ message = "message" }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.divider}
        style={{
          backgroundColor: "red",
        }}
      ></div>{" "}
      <p>Failure</p>
      <div className={styles.svgg} style={{ color: "red" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-circle-x-icon lucide-circle-x"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};
