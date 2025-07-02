import { i } from "@instantdb/react-native";

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    profiles: i.entity({
      username: i.string(),
      createdAt: i.date(),
    }),
    categories: i.entity({
      name: i.string().optional(),
    }),
    lists: i.entity({
      title: i.string(),
      createdAt: i.string(),
    }),
    items: i.entity({
      title: i.string(),
      done: i.boolean(),
      completedAt: i.date().optional(),
    }),
  },
  links: {
    listOwner: {
      forward: { on: "lists", has: "one", label: "owner" },
      reverse: { on: "profiles", has: "many", label: "ownedLists" },
    },
    listCollaborators: {
      forward: { on: "lists", has: "many", label: "collaborators" },
      reverse: { on: "profiles", has: "many", label: "sharedLists" },
    },
    itemList: {
      forward: { on: "items", has: "one", label: "list" },
      reverse: { on: "profiles", has: "many", label: "items" },
    },
    itemCreatedBy: {
      forward: { on: "items", has: "one", label: "createdBy" },
      reverse: { on: "profiles", has: "many", label: "createdItems" },
    },
    itemCompletedBy: {
      forward: { on: "items", has: "one", label: "completedBy" },
      reverse: { on: "profiles", has: "many", label: "completedItems" },
    },
    itemCategory: {
      forward: { on: "items", has: "one", label: "category", optional: true },
      reverse: { on: "categories", has: "many", label: "items" },
    },
    profileUser: {
      forward: { on: "profiles", has: "one", label: "$user" },
      reverse: { on: "$users", has: "one", label: "profile" },
    },
  },
});

export default _schema;
