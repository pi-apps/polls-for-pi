
import Header from '../partials/Header';
import PollConfigForm from '../partials/PollConfigForm';

import HOCProps from '../types/HOCProps';

const PollConfig = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header pathname={props.pathname} setMode={props.setMode} mode={props.mode} />

      {/*  Page content */}
      <main className="grow">
        <PollConfigForm setTitle={props.setTitle} />
      </main>

    </div>
  );
}

export default PollConfig;