import { TList, TListCollaborators, TListItem, TUser } from "./types";

export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
};

export const dummyListData: TList[] = [
  {
    name: "New List Wow",
    owner_id: "1",
    id: "1",
    created_at: "1",
  },
  {
    name: "Another List",
    owner_id: "1",
    id: "2",
    created_at: "2",
  },
];

export const dummyListItemData: TListItem[] = [
  {
    id: "1",
    list_id: "1",
    name: "List 1 Item",
    completed: false,
    created_at: "1",
  },
  {
    id: "2",
    list_id: "2",
    name: "List 2 Item",
    completed: false,
    created_at: "1",
  },
];

export const dummyListCollaborators: TListCollaborators[] = [
  {
    id: "1",
    list_id: "1",
    user_id: "1",
  },
  {
    id: "2",
    list_id: "1",
    user_id: "2",
  },
  {
    id: "3",
    list_id: "1",
    user_id: "3",
  },
];

export const dummyUserData: TUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
  },
  {
    id: "2",
    name: "Row Doe",
    email: "rowdoe@example.com",
  },
  {
    id: "3",
    name: "Bob Doe",
    email: "bobdoe@example.com",
  },
];
