
import Header from '../partials/Header';
import OptionsGeneratorForm from '../partials/OptionsGeneratorForm';
import HOCProps from '../types/HOCProps';

const OptionsGenerator = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <OptionsGeneratorForm {...props} />
      </main>

    </div>
  );
}

export default OptionsGenerator;