export interface UserInterface {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export type CreatedUserInterface = Omit<UserInterface, 'id'>;

export type UpdatedUserInterface = Omit<Partial<UserInterface>, 'id'>;
