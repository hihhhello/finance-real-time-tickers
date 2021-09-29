import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import styles from "./toggler.module.scss";
import { useActions } from "../../hooks/useActions";

export const Toggler = () => {
  const { setTickers, toggleIsWatching } = useActions();
  const userSettings = useSelector((state) => state.userSettings);
  const { socket } = useSelector((state) => state.socket);
  const onIsWatchingChange = (isWatching) => {
    //   emitting event first, than toggling state.isWatching
    isWatching ? socket.emit("stop") : socket.emit("start", userSettings);
    toggleIsWatching();
  };

  useEffect(() => {
    if (socket && !_.isEmpty(userSettings)) {
      socket.emit("create user", userSettings);
      if (userSettings.isWatching && userSettings.watchingTickers.length) {
        socket.emit("start");
      }
      socket.on("ticker", setTickers);
    }
  }, [socket]);

  return !userSettings || !socket ? (
    <span className={styles.loading}>Loading...</span>
  ) : (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapperBlocked]: !userSettings.watchingTickers.length,
      })}
    >
      <div
        className={styles.inner}
        onClick={() => onIsWatchingChange(userSettings.isWatching)}
      >
        <div
          className={cn(styles.switch, {
            [styles.switchOff]: !userSettings.isWatching,
          })}
        >
          <span className={styles.status}>
            {userSettings.isWatching ? "ON" : "OFF"}
          </span>
        </div>
      </div>
    </div>
  );
};
