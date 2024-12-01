// connection.js
import Constants from "expo-constants";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${Constants.expoConfig.extra.DATABASE_URL}`);

export default sql;
