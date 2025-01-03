import classes from "./style.module.css";
import React from "react";


export default function Transactions({account}) {

   return (
    <section className={classes.account}>
      <div className={classes.accountContentWrapper}>
        <h3 className={classes.accountTitle}>{account.title}</h3>
        <p className={classes.accountAmount}>{account.amount}</p>
        <p className={classes.accountAmountDescription}>
          {account.description}
        </p>
      </div>
      <div className={`${classes.accountContentWrapper} ${classes.cta}`}>
        <button className={classes.transactionButton}>
          {account.buttonText}
        </button>
      </div>
    </section>
  );


}
