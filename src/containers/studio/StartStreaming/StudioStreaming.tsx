'use client'

import { useState, useEffect } from 'react'
import useStudioStore from '../Store'

import DefaultInput from '@/components/Input/DefaultInput'
import Radio from '@/components/Input/Radio'
import SmallButton from '@/components/Button/SmallButton'
import StreamingVideo from '@/components/StreamingVideo'
import * as styles from '../index.css'
import useAuthStore from '@/store/AuthStore'
import VideoContainer from '@/components/Container/VideoContainer'


export default function StudioStreaming() {
  const { userData } = useAuthStore()
  const { streamKey, closePort, startStreaming, sendStreamTitle, sendStreamThumbnail, sendStreamLimit, isOnAir } = useStudioStore()
  const [ title, setTitle ] = useState('')
  const [ limit, setLimit ] = useState(false)
  const [ thumbnail, setThumbnail ] = useState('')
  const [ photoUrl, setPhotoUrl ] = useState('')

  useEffect (() => {
    return () => {
      closePort()
    }
  }, [])

  const submitStreamSetting = () => {
    const username = userData.username
    sendStreamTitle(username, title)
    sendStreamThumbnail(username, thumbnail)
    sendStreamLimit(username, limit)
  }
  
  const handleStartStream = () => {
    const formData = new FormData()
  
    formData.append('roomName', title)
    formData.append('isAdult', limit)
    formData.append('thumbNail', thumbnail)

    for (let [key, value] of formData) {
      console.log(key, value)
    }
    startStreaming(formData)
  }
  
  const handleEndStream = () => {
    closePort()
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const toggleLimit = () => {
    setLimit(!limit)  // limit 상태를 토글
  }

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        setPhotoUrl(event.target.result)
      }
      reader.readAsDataURL(file)
      setThumbnail(file)
    }
  }

  return (
    <VideoContainer>
      <div>
        {isOnAir ?
          <StreamingVideo streamKey={streamKey} /> 
          :
          <div className={styles.videolaceholder}>
            <div className={styles.videolaceholderText}>
              <div>라이브 스트리밍을 시작하려면 스트리밍 소프트웨어를 연결하세요.</div>
              <div>방송 시작 및 종료는 스트리밍 소프트웨어에서 가능합니다.</div>
            </div>
          </div>
        }
      </div>
      <div className={styles.streamingInfoContainer}>
        <div className={styles.streamingInfoItem}>
          <label className={styles.streamingInfoTitle}>방송 제목</label>
          <DefaultInput type='text' value={title} onChange={handleTitle} placeholder='방송 제목을 입력해주세요.'/>
        </div>

        <div className={styles.streamingInfoItem}>
          <label className={styles.streamingInfoTitle}>
            미리보기 이미지
          </label>
          <div className={styles.makeThumnailContainer}>
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Profile"
                className={styles.studioThumnailResize}
              />
            )}
            <label htmlFor="file" className={styles.customFileUpload}>
              {photoUrl ? "수정" : "이미지 업로드"}
            </label>
            <input
              type="file"
              id="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />      
          </div>
        </div>

        <div className={styles.streamingInfoItem}>
          <label className={styles.streamingInfoTitle}>연령제한</label>
          <Radio 
            text='시청자를 19세로 제한하겠습니까?'
            isActive={limit} 
            onChange={toggleLimit}
          />
        </div>
        <div className={styles.buttonGroupContainer}>
          {isOnAir ? 
            (<div className={styles.updateButtonBox}>
              <SmallButton text="업데이트" onClick={submitStreamSetting}/>
              <SmallButton text="방송종료" onClick={handleEndStream}/>
            </div>)
             :
            (<SmallButton text="스트리밍키 받기" onClick={handleStartStream}/>)
          }
        </div>
      </div>
    </VideoContainer>
  )
}


