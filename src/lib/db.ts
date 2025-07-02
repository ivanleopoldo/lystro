import { init } from "@instantdb/react-native";
import schema from "./schema";

const APP_ID = process.env.EXPO_PUBLIC_INSTANT_APP_ID;

if (!APP_ID) {
  throw new Error("Missing Instant App Id");
}

const db = init({ appId: APP_ID, schema: schema });
export default db;
