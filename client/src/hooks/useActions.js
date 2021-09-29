import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tickersActions } from "../store/slices/tickers";
import { userSettingsActions } from "../store/slices/userSettings";
import { socketActions } from "../store/slices/socket";
import { sidebarActions } from "../store/slices/sidebar";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...tickersActions,
      ...userSettingsActions,
      ...socketActions,
      ...sidebarActions,
    },
    dispatch
  );
};
