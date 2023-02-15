import { combineReducers } from "redux";
import user from "./user";
import settings from "./settings";
import program from "./program";
import platform from "./platform";
import stat from "./stat";
import vulnerability from "./vulnerability";
import subdomain from "./subdomain";
import url from "./url";
import ip from "./ip";
import notes from "./notes";

export default combineReducers({
  user,
  settings,
  platform,
  program,
  stat,
  vulnerability,
  subdomain,
  url,
  ip,
  notes,
});
