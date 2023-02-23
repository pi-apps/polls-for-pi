
import Header from '../partials/Header';
import PriceCalculatorForm from '../partials/PriceCalculatorForm';
import HOCProps from '../types/HOCProps';

const PriceCalculator = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PriceCalculatorForm {...props} />
      </main>

    </div>
  );
}

export default PriceCalculator;