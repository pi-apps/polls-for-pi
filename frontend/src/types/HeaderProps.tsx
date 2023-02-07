type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];

export default interface HeaderProps {
  onSignIn: () => void;
  onSignOut: () => void;
  onModalClose: () => void;
  setShowModal: (showModal: boolean) => void;
  user: User | null
  showModal: boolean
}

