
import Header from '../partials/Header';
import PollWizardSteps from '../partials/PollWizardSteps';
import HOCProps from '../types/HOCProps';

const PollWizard = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PollWizardSteps {...props} />
      </main>

    </div>
  );
}

export default PollWizard;