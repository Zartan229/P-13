import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./style.module.css";
import { fetchUserProfile, updateUserProfile } from "../../Utility";
import Transactions from "../Transactions/Transactions";

export default function Dashboard() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

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
    await dispatch(updateUserProfile({ firstName, lastName, token }));
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
      buttonText: "View transactions",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
      buttonText: "View transactions",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
      buttonText: "View transactions",
    },
  ];

  if (!profile) {
    return (
      <main className={`${classes.main} ${classes.bgDark}`}>
        <p>Chargement...</p>
      </main>
    );
  }
  const accountMaps = accounts.map((account, index) => (
    <Transactions key={index} account={account} />
  ));
  return (
    <main className={`${classes.main} ${classes.bgDark}`}>
      <div className={classes.header}>
        <h1>
          Welcome back
          <br />
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
          <button className={classes.editButton} onClick={() => setEdit(true)}>
            Edit Name
          </button>
        )}
      </div>
      {accountMaps}
    </main>
  );
}
