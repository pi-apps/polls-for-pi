import { User } from "./UserType"

export default interface PollResponseProps {
  user: User | null
  showModal: boolean
  signingIn: boolean

  onSignIn: () => void;
  onSignOut: () => void;
  onModalClose: () => void;
  setShowModal: (showModal: boolean) => void;
}

