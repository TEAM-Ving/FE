import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import * as styles from './index.css'
import ProfileTabComponent from './ProfileTabComponent'
import VideoTabComponent from './VideoTabComponent'

export default function TabsComponent({ where }) {
  const [activeTab, setActiveTab] = useState(where)
  const router = useRouter()
  const params = useParams()

  const move = (tabName) => {
    if ((tabName) === 'video' ) {
      console.log('hiiiiii', (tabName))
      setActiveTab('video')
      router.push(`/profile/${params.username}/video`)
    } 
    else {
      console.log('hi', (tabName))
      setActiveTab('home')
      router.push(`/profile/${params.username}`)
    }
  }

  return (
    <div className={styles.tabsContainer}>
      <ul className={styles.tabList}>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'home'} 
          onClick={() => {
            move('home')
          }}
        >
          홈
        </li>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'video'} 
          onClick={() => {
            move('video')
          }}
        >
          동영상
        </li>
      </ul>
      <div className={styles.tabPanel}>
        {activeTab === 'home' && <ProfileTabComponent />}
        {activeTab === 'video' && <VideoTabComponent />}
      </div>
    </div>
  )
}