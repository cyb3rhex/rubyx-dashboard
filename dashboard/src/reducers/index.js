import { combineReducers } from "redux";
import user from "./user";
import settings from "./settings";
import program from "./program";
import platform from "./platform";
import stat from "./stat";
import notes from "./notes";

export default combineReducers({
  user,
  settings,
  platform,
  program,
  stat,
  notes,
});
