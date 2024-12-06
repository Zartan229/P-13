import classes from "./style.module.css";

export default function SellPoint({ src, alt, title, description }) {
  return (
    <div className={classes.featureItem}>
      <img src={src} alt={alt} className={classes.featureIcon} />
      <h3 className={classes.featureItemTitle}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
