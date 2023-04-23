import { Swiper } from 'antd-mobile';
import { useEffect, useState } from 'react';
import pollsAPI from '../apis/pollsAPI';
import { ConfigProvider, theme, Typography } from 'antd';
const { Link } = Typography;
import { CompassOutline, AntOutline, AudioOutline, ChatCheckOutline } from 'antd-mobile-icons'

import './PromotedPolls.css'
import { Poll } from '../types/Poll';

import { getTextColor } from '../utils/functions';

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
const antdIcons = [<CompassOutline />, <AntOutline />, <AudioOutline />, <ChatCheckOutline />];

const PromotedPolls = () => {
  const [publicPolls, setPublicPolls] = useState<Poll[]>([]);

  const getPolls = async () => {
    const options = await pollsAPI.get(`/v1/promoted_polls`);
    return options.data;
  }

  useEffect(() => {
    getPolls().then(resp => {
      setPublicPolls(resp.data);
    })
  }, []);

  const items = publicPolls.map((poll, index) => {
    //let bgColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const colorIdx = Math.floor(Math.random() * 4);
    const bgColor = colors[colorIdx];
    //const textColor = txtColors[colorIdx];
    const textColor = getTextColor(bgColor);
    const icon = antdIcons.at(colorIdx);
    return (
      <Swiper.Item key={index}>
        <div style={{ background: bgColor }}>
          <div
            className="font-small border-t border-gray-700 row px-2 py-2"
            style={{
              display: 'flex',
              color: "#000000",
              justifyContent: 'space-between',
            }}
          >
            <span>
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                }}
              >
                <a href={`${window.location.origin}/polls/${poll.responseUrl}/response`} target="_blank">
                  {icon} {poll.title}
                </a>
              </ConfigProvider>
            </span>
            <span className="ml-2">@{poll.owner?.username} <span className='poll-reward'>({poll.perResponseReward} π)</span></span>
          </div>
        </div>
      </Swiper.Item>
    )
  })

  return (
    <section>
      <div>
        <div className="pt-20 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div style={{justifyContent: 'space-between'}}>
            <Swiper
              autoplay loop indicator={() => null}
            >
              {items}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromotedPolls;
