
import { useEffect } from 'react';
import BottomBar from '../partials/BottomBar';
import Header from '../partials/Header';
import PollConfigForm from '../partials/PollConfigForm';
import HOCProps from '../types/HOCProps';

const PollConfig = (props: HOCProps) => {
  useEffect(() => {
    document.title = 'Poll Configuration';
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PollConfigForm {...props} />
      </main>

      {props.user &&
        <BottomBar {...props} />
      }

    </div>
  );
}

export default PollConfig;