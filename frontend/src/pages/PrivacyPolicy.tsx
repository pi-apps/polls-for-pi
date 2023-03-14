
import BottomBar from '../partials/BottomBar';
import Header from '../partials/Header';
import PollStarter from '../partials/PollStarter';
import PrivacyPolicyComponent from '../partials/PrivacyPolicyComponent';
import HOCProps from '../types/HOCProps';

const PrivacyPolicy = (props: HOCProps) => {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props} />

      {/*  Page content */}
      <main className="grow">
        <PrivacyPolicyComponent {...props} />
      </main>

      {props.user &&
        <BottomBar {...props} />
      }

    </div>
  );
}

export default PrivacyPolicy;