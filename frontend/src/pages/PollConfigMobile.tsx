
import Header from '../partials/Header';
import PollConfigMobileForm from '../partials/PollConfigMobileForm';
import HOCProps from '../types/HOCProps';

const PollConfigMobile = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header pathname={props.pathname} setMode={props.setMode} mode={props.mode} />

      {/*  Page content */}
      <main className="grow">
        <PollConfigMobileForm setTitle={props.setTitle} />
      </main>

    </div>
  );
}

export default PollConfigMobile;