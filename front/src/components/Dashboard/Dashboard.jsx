import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProfile } from "../../Redux.js";
import classes from "./style.module.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const profile = useSelector((state) => state.user);
  const authenticated = useSelector((state) => state.authenticated);

  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/v1/user/profile",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
          dispatch(setProfile(response.data.body));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserProfile();
  }, [authenticated, token, dispatch]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

   const handleCancel = () => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEdit(false);
  };


  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  

        console.log(response.data.message);
  
        dispatch(setProfile({
          ...profile, 
          firstName,
          lastName,
        }));
  
        setEdit(false);
    } catch (err) {
      console.error(err);
    }
  };


  if (!profile) {
    return (
      <main className={`${classes.main} ${classes.bgDark}`}>
        <p>Chargement...</p>
      </main>
    );
  }

  return (
    <main className={`${classes.main} ${classes.bgDark}`}>
      <div className={classes.header}>
        <h1>
          Welcome back<br />
          {edit ? (
            <div className="inputDiv"> 
              <input
                type="text"
                placeholder={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${classes.input} ${classes.inputEntryTwo}`}
              />
              <input
                type="text"
                placeholder={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`${classes.input} ${classes.inputEntryOne}`}
              />
            </div>
          ) : (
            `${profile.firstName} ${profile.lastName}`
          )}
        </h1>
        {edit ? (
          <div className={classes.buttonFlex}>
            <button className={classes.saveButton} onClick={handleSave}>
              Save
            </button>
            <button className={classes.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button
            className={classes.editButton}
            onClick={() => setEdit(true)}
          >
            Edit Name
          </button>
        )}
      </div>
      <section className={classes.account}>
        <div className={classes.accountContentWrapper}>
          <h3 className={classes.accountTitle}>Argent Bank Checking (x8349)</h3>
          <p className={classes.accountAmount}>$2,082.79</p>
          <p className={classes.accountAmountDescription}>Available Balance</p>
        </div>
        <div className={`${classes.accountContentWrapper} ${classes.cta}`}>
          <button className={classes.transactionButton}>View transactions</button>
        </div>
      </section>
      <section className={classes.account}>
        <div className={classes.accountContentWrapper}>
          <h3 className={classes.accountTitle}>Argent Bank Savings (x6712)</h3>
          <p className={classes.accountAmount}>$10,928.42</p>
          <p className={classes.accountAmountDescription}>Available Balance</p>
        </div>
        <div className={`${classes.accountContentWrapper} ${classes.cta}`}>
          <button className={classes.transactionButton}>View transactions</button>
        </div>
      </section>
      <section className={classes.account}>
        <div className={classes.accountContentWrapper}>
          <h3 className={classes.accountTitle}>Argent Bank Credit Card (x8349)</h3>
          <p className={classes.accountAmount}>$184.30</p>
          <p className={classes.accountAmountDescription}>Current Balance</p>
        </div>
        <div className={`${classes.accountContentWrapper} ${classes.cta}`}>
          <button className={classes.transactionButton}>View transactions</button>
        </div>
      </section>
    </main>
  );
}
