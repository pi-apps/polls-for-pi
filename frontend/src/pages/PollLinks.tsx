
import BottomBar from '../partials/BottomBar';
import Header from '../partials/Header';
import PollLinksForm from '../partials/PollLinksForm';
import HOCProps from '../types/HOCProps';

const PollLinks = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PollLinksForm {...props} />
      </main>

      {props.user &&
        <BottomBar {...props} />
      }

    </div>
  );
}

export default PollLinks;