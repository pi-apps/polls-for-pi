
import Header from '../partials/Header';
import PollStarter from '../partials/PollStarter';
import HOCProps from '../types/HOCProps';

const GetStarted = (hocProps: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header pathname={hocProps.pathname} setMode={hocProps.setMode} />

      {/*  Page content */}
      <main className="grow">
        <PollStarter setTitle={hocProps.setTitle} />
      </main>

    </div>
  );
}

export default GetStarted;