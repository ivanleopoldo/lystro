import { InstaQLEntity } from "@instantdb/react-native";
import _schema from "@/instant.schema";

type List = InstaQLEntity<typeof _schema, "lists">;
type Profile = InstaQLEntity<typeof _schema, "profiles">;
type Item = InstaQLEntity<typeof _schema, "items">;

export type { List, Profile, Item };

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };

export default schema;
