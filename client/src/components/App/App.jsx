import React, { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import _ from "lodash";

import "react-toastify/dist/ReactToastify.css";
import styles from "./app.module.scss";
import TickersPanel from "../TickersPanel";
import { useActions } from "../../hooks/useActions";
import { DEFAULT, GET_EXPIRES_DATE } from "../../consts/userSettings";
import AvalTickers from "../AvalTickers";

export const App = () => {
  const [cookies, setCookies] = useCookies(["userSettings", "text"]);
  const userSettings = useSelector((state) => state.userSettings);
  const { setUserSettings } = useActions();

  /**
   * Cheking for @cookies , if not - setting default values
   */
  useEffect(() => {
    if (_.isEmpty(cookies.userSettings)) {
      setCookies("userSettings", DEFAULT, {
        expires: GET_EXPIRES_DATE(7),
      });
      setUserSettings(DEFAULT);
      return;
    }
    setUserSettings(cookies.userSettings);
  }, []);

  useEffect(() => {
    const isNew = JSON.parse(localStorage.getItem("is-new"));
    if (isNew || _.isNull(isNew)) {
      toast.warning("The numbers in ticks are randomly generated!", {
        toastId: "ticks-warning",
        autoClose: false,
      });
      localStorage.setItem("is-new", false);
      return;
    }
  });

  /**
   * Preventing first render and default values
   * Using @useRef to call @useEffect only on updates.
   */
  const didMount = useRef(false);
  useEffect(() => {
    if (
      didMount.current &&
      !_.isEmpty(userSettings)
      // !_.isEqual(userSettings, DEFAULT)
    ) {
      setCookies("userSettings", userSettings, {
        expires: GET_EXPIRES_DATE(7),
      });
    } else {
      didMount.current = true;
    }
  }, [userSettings]);

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <TickersPanel />
      <AvalTickers />
    </div>
  );
};
