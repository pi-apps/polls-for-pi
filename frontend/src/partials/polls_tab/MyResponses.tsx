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
import { PollResponse } from "../../types/PollResponse";

export const MyResponses = (props: HOCProps) => {

  const [userResponses, setUserResponses] = useState<PollResponse[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<PollResponse[]>([]);

  const getUserResponses = async (username?: string) => {
    const options = await pollsAPI.get(`/v1/polls/user_responses?username=${username}`);
    return options.data;
  }

  useEffect(() => {
    getUserResponses(props.user?.username || 'eastmael').then(resp => {
      setUserResponses(resp.data);
      setFilteredResponses(resp.data);
    })
  }, []);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showLinksPopup, setShowLinksPopup] = useState(false);

  const [itemPollResponse, setItemPollResponse] = useState<PollResponse>();

  return (
    <>
      <List header={
        <SearchBar
          placeholder='Filter'
          onChange={(value: string) => {
            const filteredResponses = userResponses.filter((item: PollResponse) => item.response.toLowerCase().indexOf(value.toLowerCase()) >= 0)
            setFilteredResponses(filteredResponses);
          }}
          onClear={() => {
            setFilteredResponses(userResponses);
          }}
        />
      }>
        {filteredResponses && filteredResponses.length > 0 ?
          filteredResponses?.map((item, index) =>
              <List.Item
                key={index}
                extra={`${item.response}`}
                // onClick={() => {
                //   setShowEditPopup(true);
                //   setItemPoll(item);
                // }}
              >
                <span
                  key={`span-${index}`}
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {item.pollTitle}
                </span>
              </List.Item>
          )
          :
          <>
            <ErrorBlock
              title='Nothing to see here.'
              status='empty'
              description={
                <>
                  <div className='mb-5'>
                    No poll response submitted yet.
                  </div>
                  <Link to="/get_started" className="btn text-white bg-purple-600 hover:bg-purple-700 mb-4 sm:w-auto sm:mb-0">
                    Participate in polls
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
          {itemPollResponse?.response}
          {/* <ListItemPollForm
            poll={itemPollResponse} setDisplayPopup={setShowEditPopup}
          /> */}
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
          {itemPollResponse?.response}
          {/* <ListItemLinksForm
            poll={itemPoll} setDisplayPopup={setShowLinksPopup}
          /> */}
        </div>
      </Popup>
    </>
  )
}