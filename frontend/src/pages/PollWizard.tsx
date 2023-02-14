
import Header from '../partials/Header';
import PollWizardSteps from '../partials/PollWizardSteps';
import HOCProps from '../types/HOCProps';

const PollWizard = (hocProps: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header pathname={hocProps.pathname} setMode={hocProps.setMode} mode={hocProps.mode} />

      {/*  Page content */}
      <main className="grow">
        <PollWizardSteps setTitle={hocProps.setTitle} />
      </main>

    </div>
  );
}

export default PollWizard;