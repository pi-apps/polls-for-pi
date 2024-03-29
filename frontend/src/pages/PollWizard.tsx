
import { useEffect } from 'react';
import BottomBar from '../partials/BottomBar';
import Header from '../partials/Header';
import PollWizardSteps from '../partials/PollWizardSteps';
import HOCProps from '../types/HOCProps';

const PollWizard = (props: HOCProps) => {
  useEffect(() => {
    document.title = 'Polls Wizard';
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PollWizardSteps {...props} />
      </main>

      {props.user &&
        <BottomBar {...props} />
      }

    </div>
  );
}

export default PollWizard;