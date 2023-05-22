
import { useEffect } from 'react';
import Header from '../partials/Header';
import PollResponseForm from '../partials/PollResponseForm';
import HOCProps from '../types/HOCProps';

const PollResponse = (props: HOCProps) => {
  useEffect(() => {
    document.title = 'Poll Response';
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PollResponseForm {...props} />
      </main>

    </div>
  );
}

export default PollResponse;