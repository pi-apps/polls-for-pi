
import Header from '../partials/Header';
import PollStarter from '../partials/PollStarter';
import HOCProps from '../types/HOCProps';

const GetStarted = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header pathname={props.pathname} setMode={props.setMode} mode={props.mode} />

      {/*  Page content */}
      <main className="grow">
        <PollStarter setTitle={props.setTitle} />
      </main>

    </div>
  );
}

export default GetStarted;