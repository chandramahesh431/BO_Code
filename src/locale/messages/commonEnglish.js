import en from "./en-us";
import { LOCALES } from "../locales";

export default {
  [LOCALES.english]: { ...en[LOCALES.english] },
};
