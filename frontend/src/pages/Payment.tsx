
import { useEffect } from 'react';
import BottomBar from '../partials/BottomBar';
import Header from '../partials/Header';
import PaymentForm from '../partials/PaymentForm';
import HOCProps from '../types/HOCProps';

const Payment = (props: HOCProps) => {
  useEffect(() => {
    document.title = 'Poll Payment';
  }, []);

  return (
    <>
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PaymentForm {...props} />
      </main>

      {props.user &&
        <BottomBar {...props} />
      }

    </div>
    {/* {props.showModal && <SignIn onSignIn={props.onSignIn} onModalClose={props.onModalClose} />} */}
    </>
  );
}

export default Payment;