
import Banner from '../partials/Banner';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import PublicPolls from '../partials/PublicPolls';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import PageIllustration from '../partials/PageIllustration';
import HOCProps from '../types/HOCProps';
import { NoticeBar, Space, Swiper } from 'antd-mobile'
import { useEffect } from 'react';

const HomeV2 = (props: HOCProps) => {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black">
      {/*  Site header */}
      <Header {...props}  />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <HeroHome />

        <FeaturesBlocks />
        {/* <FeaturesZigZag /> */}
        <PublicPolls />
        {/* <Newsletter /> */}
      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default HomeV2;