import { User } from "./UserType";

export default interface HeaderProps {
  onSignIn: () => void;
  onSignOut: () => void;
  onModalClose: () => void;
  setShowModal: (showModal: boolean) => void;
  user: User | null
  showModal: boolean
}

