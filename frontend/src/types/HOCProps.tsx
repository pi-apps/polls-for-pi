import { Poll } from "./Poll"
import { User } from "./UserType"

export default interface HOCProps {
  title?: string
  mode?: string
  pathname?: string
  user: User | null
  showModal: boolean
  poll: Poll

  setTitle?: (title: string) => void;
  setMode?: (title: string) => void;
  onSignIn: () => void;
  onSignOut: () => void;
  onModalClose: () => void;
  setShowModal: (showModal: boolean) => void;
  setPoll: (poll: Poll) => void;
}

