'use client'

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"
import * as styles from './index.css'
import SmallButton from "@/components/Button/SmallButton";
import useAuthStore from "@/store/AuthStore";
import useStreamingStore from "@/store/StreamingStore";
import useProfileStore from "@/store/ProfileStore";
import ProfileImage from "@/components/ProfileImg";
import { vars } from "@/styles/vars.css";
import StreamingVideo from "@/components/StreamingVideo";
import VideoContainer from "@/components/Container/VideoContainer";

export default function ViewerStreaming() {

  const [loading, setLoading] = useState(false)
  const { userData } = useAuthStore()
  const { streamRoomData, setIsStreamerFollowed, isStreamerFollowed } = useStreamingStore()
  const { streamerProfileData, streamerUserName, getStreamerProfileInfo, doFollowUser, unDoFollowUser } = useProfileStore()
  const [subscriberCount, setSubscriberCount] = useState(streamerProfileData.followers || 0)
  const [isFollowed, setIsFollowed] = useState(streamerProfileData.isFollowed)

  const router = useRouter()
  const params = useParams()

  const streamKey = `${streamRoomData.username}_${streamRoomData.roomId}`
  // console.log('-------여기는 스트리머 방 페이지 팔로잉 팔로우 확인용')

  const loginUserName = userData.username

  const toggleFollow = () => {
    setLoading(true)

    if (isFollowed) {
      setIsFollowed(false)
      setIsStreamerFollowed(false)
      setSubscriberCount(subscriberCount - 1)
      unDoFollowUser(streamerUserName)
    } else {
      setIsFollowed(true)
      setIsStreamerFollowed(true)
      setSubscriberCount(subscriberCount + 1)
      doFollowUser(streamerUserName)
    }
    setLoading(true)
  }

  useEffect(() => {
    let encodedUsername = params.username
    // console.log(encodedUsername)
    encodedUsername = String(encodedUsername).replace(/%3D/g, '')
    const decodedUsername = atob(encodedUsername)
      // decodedUsername이 null인 경우만 initData를 호출
      const initData = async () => {
        // console.log('스트리머 방 관련 정보 가져오기', decodedUsername)
        await getStreamerProfileInfo(decodedUsername)
        setLoading(true)
      }
      initData()
    // console.log(streamerUserName, decodedUsername, '의 방입니다^^^^^^^^')
  }, [getStreamerProfileInfo])

  useEffect(() => {
    setLoading(true)
    if (streamerProfileData) {
      setIsFollowed(streamerProfileData.isFollowed || false)
      setIsStreamerFollowed(streamerProfileData.isFollowed || false)
      // 팔로우가 된 상태라면
      // 맨 처음에 팔로우 안 되어 있으면 자동으로 false
    }
  }, [streamerProfileData])

  const [timeElapsed, setTimeElapsed] = useState("")

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const createdTime = new Date(streamRoomData.createdAt).getTime()
      const now = new Date().getTime()
      const secondsDifference = Math.floor((now - createdTime) / 1000)
      
      const hours = Math.floor(secondsDifference / 3600).toString().padStart(2, '0')
      const minutes = Math.floor((secondsDifference % 3600) / 60).toString().padStart(2, '0')
      const seconds = (secondsDifference % 60).toString().padStart(2, '0')

      const formattedTime = `${hours}:${minutes}:${seconds}`
      setTimeElapsed(formattedTime)
    }

    calculateTimeElapsed()
    const intervalId = setInterval(calculateTimeElapsed, 1000)

    return () => clearInterval(intervalId)
  }, [streamRoomData.createdAt])

  if (loading) {
  return (
    <VideoContainer>
      <div className={styles.videoPlayer}>
        <StreamingVideo streamKey={streamKey}/>
      </div>
      <div className={styles.streamerInfoContainer}>
        <div className={styles.leftBoxContainer}>
          <ProfileImage url={streamerProfileData.photoUrl} width={80} alt={"User profile"}/>
          <div className={styles.leftBox}>
            <div className={styles.leftBoxItem}>
              <div className={styles.streamingTitle}>{streamRoomData.title}</div>
            </div>
            <div className={styles.leftBoxItem}>
              <div className={styles.streamerName}>{streamerProfileData.nickname}</div>    
            </div>  
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.rightBoxItme}>
            {`${streamerUserName}` === loginUserName ? (
              <SmallButton text='채널관리' color={vars.colors.gray} onClick={() => router.push(`/setting/${loginUserName}`)} />
            ) : (
                  <SmallButton
                    text={isFollowed ? '팔로잉' : '팔로우'}
                    color={isFollowed ? 'lightGray' : 'black'}
                    onClick={() => {toggleFollow()}}
                  />
            )}
          </div>
          <div className={styles.rightBoxItme}>
            <span className={styles.stremingInfo}>{streamRoomData.viewers}명 시청 중 {timeElapsed}스트리밍 중</span>
          </div>
        </div>
      </div>
    </VideoContainer>
  )
  }
}