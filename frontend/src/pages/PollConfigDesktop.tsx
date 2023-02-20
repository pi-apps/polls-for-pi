
import Header from '../partials/Header';
import PollConfigFormDesktop from '../partials/PollConfigFormDesktop';

import HOCProps from '../types/HOCProps';

const PollConfigDesktop = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header pathname={props.pathname} setMode={props.setMode} mode={props.mode} />

      {/*  Page content */}
      <main className="grow">
        <PollConfigFormDesktop setTitle={props.setTitle} />
      </main>

    </div>
  );
}

export default PollConfigDesktop;