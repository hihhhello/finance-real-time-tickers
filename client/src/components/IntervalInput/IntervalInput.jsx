import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { ENTER } from "../../consts/keyNames";
import styles from "./interval-input.module.scss";
import { useActions } from "../../hooks/useActions";
import { toast } from "react-toastify";

export const IntervalInput = () => {
  const userSettings = useSelector((state) => state.userSettings);
  const { socket } = useSelector((state) => state.socket);
  const [intervalInput, setIntervalInput] = useState("");
  const { setUpdateInterval } = useActions();
  const intervalInputHandler = () => {
    if (intervalInput === userSettings.updateInterval) return;
    if (isNaN(+intervalInput)) {
      toast.warning("Interval input must be an integer", {
        toastId: "interval-input-warning",
      });
      setIntervalInput(userSettings.updateInterval);
      return;
    }
    if (intervalInput < 1000) {
      toast.warning("Interval input must be more than 0 ms", {
        toastId: "interval-input-warning",
      });
      setIntervalInput(userSettings.updateInterval);
      return;
    }
    setUpdateInterval({ value: intervalInput, socket });
  };
  useEffect(() => {
    if (userSettings.updateInterval) {
      setIntervalInput(userSettings.updateInterval);
    }
  }, [userSettings.updateInterval]);
  return (
    <div className={styles.wrapper}>
      {_.isEmpty(userSettings) && !socket ? (
        <span className={styles.loading}>Loading...</span>
      ) : (
        <>
          <div className={styles.input}>
            <label htmlFor="update-interval">Update interval (ms)</label>
            <input
              type="text"
              id="update-interval"
              value={intervalInput}
              onChange={(e) => setIntervalInput(e.target.value)}
              // onKeyDown={(e) => intervalInputHandler(e)}
            />
          </div>
          <button className={styles.btn} onClick={intervalInputHandler}>
            set
          </button>
        </>
      )}
    </div>
  );
};
