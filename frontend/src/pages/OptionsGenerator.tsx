
import { useEffect } from 'react';
import BottomBar from '../partials/BottomBar';
import Header from '../partials/Header';
import OptionsGeneratorForm from '../partials/OptionsGeneratorForm';
import HOCProps from '../types/HOCProps';

const OptionsGenerator = (props: HOCProps) => {
  useEffect(() => {
    document.title = 'Poll Options Generator';
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <OptionsGeneratorForm {...props} />
      </main>

      {props.user &&
        <BottomBar {...props} />
      }

    </div>
  );
}

export default OptionsGenerator;