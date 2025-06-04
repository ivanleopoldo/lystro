export type TList = {
  id: string;
  owner_id: string;
  name: string;
  created_at: string;
};

export type TListItem = {
  id: string;
  list_id: string;
  name: string;
  completed: boolean;
  created_at: string;
  completed_at?: string | null;
  completed_by?: string | null;
};

export type TListCollaborators = {
  id: string;
  list_id: string;
  user_id: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
};
