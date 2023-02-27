import { Poll } from "./Poll";

export default interface ListItemPollProps {
  poll: Poll
  buttonTxt?: string
  callback?: () => void;
  setDisplayPopup: (displayPopup: boolean) => void;
}

