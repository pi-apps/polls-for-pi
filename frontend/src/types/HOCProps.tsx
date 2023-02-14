type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];
export default interface HOCProps {
  title?: string
  mode?: string
  pathname?: string
  user?: User | null
  showModal?: boolean

  setTitle?: (title: string) => void;
  setMode?: (title: string) => void;
  onSignIn?: () => void;
  onSignOut?: () => void;
  onModalClose?: () => void;
  setShowModal?: (showModal: boolean) => void;
}

