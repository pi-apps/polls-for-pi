
import { useEffect } from 'react';
import BottomBar from '../partials/BottomBar';
import Header from '../partials/Header';
import PollEditForm from '../partials/PollEditForm';
import HOCProps from '../types/HOCProps';

const PollEdit = (props: HOCProps) => {
  useEffect(() => {
    document.title = 'Edit Poll';
  }, []);

  return (
    <>
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PollEditForm {...props} />
      </main>

      {props.user &&
        <BottomBar {...props} />
      }

    </div>
    {/* {props.showModal && <SignIn onSignIn={props.onSignIn} onModalClose={props.onModalClose} />} */}
    </>
  );
}

export default PollEdit;