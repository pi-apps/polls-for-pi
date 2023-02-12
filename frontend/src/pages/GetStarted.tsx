
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PollStarter from '../partials/PollStarter';
import HOCProps from '../types/HOCProps';

const GetStarted = (hocProps: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        <PollStarter setTitle={hocProps.setTitle} />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default GetStarted;