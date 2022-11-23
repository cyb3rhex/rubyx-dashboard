import { combineReducers } from "redux";
import user from "./user";
import settings from "./settings";
import program from "./program";
import platform from "./platform";
import revenue from "./revenue";
import vulnerability from "./vulnerability";
import subdomain from "./subdomain";
import url from "./url";
import ip from "./ip";

export default combineReducers({
  user,
  settings,
  platform,
  program,
  revenue,
  vulnerability,
  subdomain,
  url,
  ip
});
