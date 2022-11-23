import { combineReducers } from "redux";
import user from "./user";
import settings from "./settings";
import program from "./program";
import platform from "./platform";

export default combineReducers({
  user,
  settings,
  platform,
  program,
});
