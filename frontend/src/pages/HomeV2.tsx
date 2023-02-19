
import Banner from '../partials/Banner';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import PageIllustration from '../partials/PageIllustration';
import HOCProps from '../types/HOCProps';

const HomeV2 = (props: HOCProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header setMode={props.setMode} mode={props.mode} pathname={props.pathname}  />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <HeroHome />
        <FeaturesBlocks />
        {/* <FeaturesZigZag />
        <Testimonials />
        <Newsletter /> */}
      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default HomeV2;