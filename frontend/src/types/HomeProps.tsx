import { User } from "./UserType";

export default interface HomeProps {
  signIn: () => void;
  signOut: () => void;
  modalClose: () => void;
  user: User | null
  showModal: boolean
}