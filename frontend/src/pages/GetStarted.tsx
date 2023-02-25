
import Header from '../partials/Header';
import PollStarter from '../partials/PollStarter';
import HOCProps from '../types/HOCProps';

const GetStarted = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PollStarter {...props} />
      </main>

    </div>
  );
}

export default GetStarted;