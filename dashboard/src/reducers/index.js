import { combineReducers } from "redux";
import user from "./user";
import settings from "./settings";
import program from "./program";
import platform from "./platform";
import revenue from "./revenue";
import vulnerability from "./vulnerability";

export default combineReducers({
  user,
  settings,
  platform,
  program,
  revenue,
  vulnerability
});
