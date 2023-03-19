import { Swiper } from 'antd-mobile';
import { useEffect, useState } from 'react';
import pollsAPI from '../apis/pollsAPI';
import { ConfigProvider, theme, Typography } from 'antd';
const { Link } = Typography;

import { Poll } from '../types/Poll';

import './PublicPolls.css'
import { getTextColor } from '../utils/functions';

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const PublicPolls = () => {
  const [publicPolls, setPublicPolls] = useState<Poll[]>([]);

  const getPolls = async () => {
    console.log("get polls ");
    const options = await pollsAPI.get(`/v1/public_polls`);
    return options.data;
  }

  useEffect(() => {
    getPolls().then(resp => {
      console.log('polls data', resp.data)
      setPublicPolls(resp.data);
    })
  }, []);

  const items = publicPolls.map((poll, index) => {
    //let bgColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const bgColor = colors[Math.floor(Math.random() * 4)];
    const textColor = getTextColor(bgColor);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = new Date(poll.endDate)?.toLocaleDateString('en-US', options);
    return (
      <Swiper.Item key={index}>
        <div style={{ background: bgColor }}>
          <div className="flex flex-col h-full p-6" data-aos="fade-up">
            {/* <div>
              <div className="relative inline-flex flex-col mb-4">
                <img className="rounded-full" src={TestimonialImage01} width="48" height="48" alt="Testimonial 01" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
              </div>
            </div> */}
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
              }}
            >
              <Link href={`${window.location.origin}/polls/${poll.responseUrl}/response`} target="_blank">
                <blockquote className="text-lg grow">{poll.title}</blockquote>
              </Link>
            </ConfigProvider>
            <div
              className="font-medium mt-6 pt-5 border-t border-gray-700"
              style={{color: textColor}}
            >
              <div>
                <cite className="not-italic">By {poll.owner?.username} ({poll.perResponseReward} π/response)</cite>
              </div>
              <div>
                <cite className="not-italic">Until {formattedDate}</cite>
              </div>
            </div>
          </div>
        </div>
      </Swiper.Item>
    )
  })

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Participate in Public Polls</h2>
            <p className="text-xl text-gray-400">Here are the currently open polls awaiting your feedback.</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <Swiper autoplay loop>{items}</Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PublicPolls;
