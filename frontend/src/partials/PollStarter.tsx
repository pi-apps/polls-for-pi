import { Input } from 'antd';
import { Link } from 'react-router-dom';
import HOCProps from '../types/HOCProps';

import './PollStarter.css';

const { Search } = Input;

const PollStarter = (hocProps: HOCProps) => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            <h2 className="h2 mb-4" data-aos="fade-up">
              What should we title your poll?
            </h2>
            <p className="text-xl mb-8" data-aos="fade-up" data-aos-delay="200">
              <Search
                placeholder="Your poll title"
                enterButton={
                  <Link
                    to="/wizard"
                    className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    Proceed
                  </Link>
                }
                size="large"
                className='title-box'
                style={{backgroundColor: "#1677ff"}}
                onSearch={hocProps.setTitle}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PollStarter;