
import Header from '../partials/Header';
import PaymentForm from '../partials/PaymentForm';
import HOCProps from '../types/HOCProps';

const Payment = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PaymentForm {...props} />
      </main>

    </div>
  );
}

export default Payment;