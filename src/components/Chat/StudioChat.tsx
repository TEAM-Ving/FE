'use client';

import React, { useState, useEffect, useRef } from "react"
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import DefaultInput from "../Input/DefaultInput"
import SmallButton from "../Button/SmallButton"
import * as styles from "./index.css"
import { vars } from "@/styles/vars.css"
import EmojiPicker from "emoji-picker-react"
import useAuthStore from "@/store/AuthStore";
import { getRandomColor } from "./utils";
import useChatStore from "@/components/Chat/Store";
import { getFormattedTimestamp } from "@/utils/dateUtils";
import { line } from "@/styles/common.css";
import useStreamingStore from "@/store/StreamingStore";
import ChatProfile from "./ChatProfile";
import useModal from "@/hooks/useModal";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ProfileImage from "../ProfileImg";
import MenuItem from "../DropdownMenu/MenuItem";
import css from "styled-jsx/css";

interface Message {
  userName: string;
  nickname: string;
  timeStamp: string;
  donation : number;
  isTts : Boolean;
  text: string;
}

export default function StudioChat() {
  const { userData } = useAuthStore()
  const { streamRoomData } = useStreamingStore()
  const { getChatProfile, selectedUserData } = useChatStore()
  const stompSubscription  = useRef<StompSubscription | null>(null)
  const stompClient = useRef<CompatClient | null>(null)
  const [connected, setConnected] = useState(false);
  const messages = useChatStore(state => state.messages)
  const addMessage = useChatStore(state => state.addMessage)
  const [nicknameColors, setNicknameColors] = useState(new Map());
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatBoxRef = useRef(null);
  const { open, close, isOpen } = useModal()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const roomId = btoa(userData.username);

  const getNicknameColor = (nickname: string) => {
    if (nicknameColors.has(nickname)) {
      return nicknameColors.get(nickname);
    } else {
      const newColor = getRandomColor(); // 랜덤 색상 생성 함수
      setNicknameColors(new Map(nicknameColors.set(nickname, newColor)));
      return newColor;
    }
  };

  const onMessageReceived = (msg: string) => {
    const newMessage = JSON.parse(msg.body);
    console.log(newMessage);
    addMessage(newMessage);
  };

  const connect = () => {
    if (connected) {
      console.log("이미 WebSocket에 연결되어 있습니다. 연결 상태:", connected);
      return; // 이미 연결된 경우 추가 연결 방지
    }  

    console.log("WebSocket 연결 시도 중...");
    const client = Stomp.over(() => new SockJS('https://k10a203.p.ssafy.io/ws'));

    client.reconnect_delay = 5000;
    client.debug = function(str) {
      console.log('STOMP Debug:', str);
    };

    client.onConnect = () => {
      console.log("연결 완료");
      setConnected(true);
      client.subscribe(`/sub/channel/${roomId}`, onMessageReceived, {
        id: `sub-${roomId}`,
        ack: 'client'
      });
    };

    client.onDisconnect = () => {
      console.log("WebSocket 연결 해제 완료");
      setConnected(false);
    };

    client.activate();
    stompClient.current = client;
  };

  
  useEffect(() => {
    function unSub() {
      console.log("WebSocket 연결 해제 시도 중...");
      console.log(stompSubscription)
      if (stompSubscription.current !== null)
      {
        stompSubscription.current.unsubscribe()
      }
      else
      {
        console.log("사실 난 없는사람이야", stompSubscription.current)
      }
      if (stompClient.current) {
        // stompClient.unsubscribe(stompSubscription)
        console.log("WebSocket 연결 해제 시도 중...");
        stompClient.current.deactivate();
      }
    }
    
    connect();
    return () => {
      unSub()
    };
  }, [roomId]);

  
  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    setMessageInput(prev => prev + emoji.emoji);
  }

  const handleSendMessage = (event) => {
    event.preventDefault()
    const formattedTimestamp = getFormattedTimestamp()

    if (stompClient && messageInput.trim() && connected) {
      const message = {
        userName: userData.username,
        nickname: userData.nickname,
        timeStamp: formattedTimestamp,
        donation: 0,
        isTts: false,
        text: messageInput,
      };
      stompClient.current.publish({
        destination: `/pub/channel/${roomId}`,
        body: JSON.stringify(message)
      });
      console.log("메시지 형식:", message)
      setMessageInput('');
    } else {
      console.log("아직 소켓 연결 안 됨");
    }
  };

  useEffect(() => {
    // 스크롤 항상 아래로 내리기
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);


  const handleNicknameClick = async (user: string) => {
    const streamer = streamRoomData.username;
    const viewer = user;
    setDropdownOpen(true);
    console.log("드롭다운 버튼 여는 중")
    try {
      const profileData = await getChatProfile(streamer, viewer);
      if (profileData) {
        console.log("내 프로필 정보", profileData);  // 데이터 확인
      } else {
        console.log("프로필 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("프로필 정보 가져오기 실패", error);
    }
  };


  return (
    <div className={styles.studioChatContainer}>
      <div className={styles.title}>
        채팅
      </div>
      <hr className={line} />
      <div className={styles.studioChatContent}>
        <div className={styles.studioChatBox} ref={chatBoxRef}>
        {messages.map((msg, index) => (
            <div 
              key={index} 
              className={styles.chatItem}
            >
              {msg.donation ? 
                <div className={styles.donationChatItem}>
                  <button 
                    style={{ color: getNicknameColor(msg.userName) }}
                    className={styles.dontaionChatNickname}
                  >
                    {msg.nickname}
                  </button>
                  <div>{msg.text}</div>
                  <hr className={line} />
                  <div className={styles.donationChatItemChoco}>🍫 {msg.donation}</div>
                </div>
              : 
                <div>
                  <DropdownMenu
                    button={
                      <div>
                        <button
                          style={{ color: getNicknameColor(msg.nickname) }}
                          className={styles.chatNickname}
                        >
                          {userData.username === msg.userName ? "👑" : ""}{msg.nickname}
                        </button>
                      </div>
                    }
                    position="left"
                  >
                    <MenuItem onClick={() => console.log("프로필 보기")}>프로필 보기</MenuItem>
                    <MenuItem onClick={() => console.log("차단하기")}>차단하기</MenuItem>
                  </DropdownMenu>
                  <span>: {msg.text}</span>
                </div>
              }
            </div>
          ))}
        </div>
        <form className={styles.inputBox} onSubmit={handleSendMessage}>     
          <div className={styles.emojiBox}>
            {showEmojiPicker && (
              <EmojiPicker 
                width="100%" 
                searchDisabled={true} 
                height={180} 
                previewConfig={{
                  defaultEmoji: "1f60a",
                  defaultCaption: "What's your mood?",
                  showPreview: false
                }}
              onEmojiClick={handleEmojiClick} 
            />
            )}
          </div>
          <DefaultInput 
            type="text"
            value={messageInput}
            onChange={handleChange}
            placeholder="채팅을 입력해 주세요"
            onEmojiClick={openEmojiPicker}
          />
        </form>
        <div className={styles.studioChatSendButtonBox}>
          <SmallButton text="전송" color={vars.colors.darkGray} onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
