import { combineReducers } from "redux";
import user from "./user";
import settings from "./settings";
import program from "./program";
import platform from "./platform";
import stat from "./stat";
import vulnerability from "./vulnerability";
import subdomain from "./subdomain";
import notes from "./notes";
import scan from "./scan";
import url from "./url";

export default combineReducers({
  user,
  settings,
  platform,
  program,
  stat,
  vulnerability,
  subdomain,
  notes,
  scan,
  url,
});
