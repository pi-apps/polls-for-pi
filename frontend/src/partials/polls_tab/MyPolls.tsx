import { Tabs, List, SwipeAction, Toast, ErrorBlock, Popup, SearchBar } from "antd-mobile";
import {
  AppOutline, EditSOutline, EyeOutline, LinkOutline, UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';

import TabProps from '../../types/TabProps';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Poll } from "../../types/Poll";
import ListItemLinksForm from "../ListItemLinksForm";
import ListItemPollForm from "../ListItemPollForm";
import pollsAPI from "../../apis/pollsAPI";
import HOCProps from "../../types/HOCProps";

export const MyPolls = (props: HOCProps) => {

  const [userPolls, setUserPolls] = useState<Poll[]>([]);
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([]);

  const getUserPolls = async (username?: string) => {
    const options = await pollsAPI.get(`/v1/polls?username=${username}`);
    return options.data;
  }

  useEffect(() => {
    getUserPolls(props.user?.username || 'eastmael').then(resp => {
      setUserPolls(resp.data);
      setFilteredPolls(resp.data);
    })
  }, []);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showLinksPopup, setShowLinksPopup] = useState(false);

  const [itemPoll, setItemPoll] = useState<Poll>({
    title: '',
    optionCount: 2,
    distribution: '',
    isLimitResponse: true,
    responseLimit: 100,
    durationDays: 30,
    perResponseReward: 0,
    responses: [],
    responseUrl: '',
    accessType: 'unlisted',
  });

  return (
    <>
      <List header={
        <SearchBar
          placeholder='Filter'
          onChange={(value: string) => {
            const filteredPolls = userPolls.filter((item: Poll) => item.title.toLowerCase().indexOf(value.toLowerCase()) >= 0)
            setFilteredPolls(filteredPolls);
          }}
          onClear={() => {
            setFilteredPolls(userPolls);
          }}
        />
      }>
        {filteredPolls && filteredPolls.length > 0 ?
          filteredPolls?.map((item, index) =>
            <SwipeAction
              key={index}
              closeOnAction={false}
              rightActions={[
                {
                  key: 'edit',
                  text: <EditSOutline />,
                  color: 'primary',
                  onClick: (e) => {
                    setShowEditPopup(true);
                    setItemPoll(item);
                  }
                },
                {
                  key: 'show',
                  text: <EyeOutline />,
                  color: 'success',
                  onClick: (e) => {
                    setShowLinksPopup(true);
                    setItemPoll(item);
                  }
                },
                {
                  key: 'copy-lin',
                  text: <LinkOutline />,
                  color: 'light',
                  onClick: (e) => {
                    navigator.clipboard.writeText(`${window.location.origin}/${item.responseUrl}` || '');
                    Toast.show({
                      content: 'Response URL copied to clipboard.',
                    })
                  }
                }
              ]}
            >
              <List.Item
                key={index}
                extra={`${item.responses.length} responses`}
                clickable
                onClick={() => {
                  Toast.show('Swipe left to see actions.')
                }}
                // onClick={() => {
                //   setShowEditPopup(true);
                //   setItemPoll(item);
                // }}
              >
                <span
                  key={`span-${index}`}
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {item.title}
                </span>
              </List.Item>
            </SwipeAction>
          )
          :
          <>
            <ErrorBlock
              title='Nothing to see here.'
              status='empty'
              description={
                <>
                  <div className='mb-5'>
                    No polls created yet.
                  </div>
                  <Link to="/get_started" className="btn text-white bg-purple-600 hover:bg-purple-700 mb-4 sm:w-auto sm:mb-0">
                    Create your first poll
                  </Link>
                </>
              }
              style={{
                '--image-height': '150px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
              className='mb-5'
            />
          </>
        }
      </List>
      <Popup
        position='right'
        visible={showEditPopup}
        showCloseButton
        onClose={() => {
          setShowEditPopup(false)
        }}
        destroyOnClose={true}
        bodyStyle={{ width: '100vw' }}
      >
        <div
          style={{ height: '98vh', overflowY: 'scroll' }}
        >
          <ListItemPollForm
            poll={itemPoll} setDisplayPopup={setShowEditPopup}
          />
        </div>
      </Popup>
      <Popup
        position='right'
        visible={showLinksPopup}
        showCloseButton
        onClose={() => {
          setShowLinksPopup(false)
        }}
        destroyOnClose={true}
        bodyStyle={{ width: '100vw' }}
      >
        <div
          style={{
            height: '98vh', overflowY: 'scroll',
          }}
        >
          <ListItemLinksForm
            poll={itemPoll} setDisplayPopup={setShowLinksPopup}
          />
        </div>
      </Popup>
    </>
  )
}