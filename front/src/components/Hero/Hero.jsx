import classes from "./style.module.css";

export default function Hero() {
  return (
    <div className={classes.hero}>
      <section className={classes.heroContent}>
        <h2 className={classes.srOnly}>Promoted Content</h2>
        <p className={classes.subtitle}>No fees.</p>
        <p className={classes.subtitle}>No minimum deposit.</p>
        <p className={classes.subtitle}>High interest rates.</p>
        <p className={classes.text}>Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
}
