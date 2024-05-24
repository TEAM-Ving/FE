import React, { useEffect } from 'react';
import Link from 'next/link';
import * as styles from './index.css'
import { FaUserCircle } from 'react-icons/fa';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import MenuItem from '../DropdownMenu/MenuItem';
import Logout from '@/containers/auth/Logout';

import useAuthStore from '@/store/AuthStore'
import ProfileImage from '../ProfileImg';
import useProfileStore from '@/store/ProfileStore';
import { useRouter } from 'next/navigation';

export default function ProfileMenu({ onLogout }) {
  const { userData } = useAuthStore()
  const { getLoginUserInfo, loginUserProfileData, getUserProfileInfo } = useProfileStore()
  const username = btoa(userData.username)
  const router = useRouter()

  const handleMyChannel = () => {
    getUserProfileInfo(userData.username)
    // console.log(userData.username)
    router.push(`/profile/${username}`)
  }

  useEffect(() => {
    // console.log('sdfsdfsdsdsdfsdfsdsdfdsffs')
  }, [loginUserProfileData])
  

  return (
    <div className={styles.profileMenuContainer}>
      <DropdownMenu 
        button={<button className={styles.avatarButton}>
          <ProfileImage 
            url={loginUserProfileData.photoUrl} 
            width={40}
            alt="User profile" 
          />
        </button>}>
        <MenuItem onClick={() => router.push(`/setting/${username}`)}>
          세팅
        </MenuItem>
        <MenuItem onClick={() => handleMyChannel()}>
          내 채널
        </MenuItem>
        <MenuItem>
          <Logout onLogoutSuccess={onLogout} />
        </MenuItem>
      </DropdownMenu>
    </div>
  );
}