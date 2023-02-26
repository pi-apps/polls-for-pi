import { Poll } from "./Poll";

export default interface ListItemPollProps {
  poll: Poll
  setDisplayPopup: (displayPopup: boolean) => void;
}

