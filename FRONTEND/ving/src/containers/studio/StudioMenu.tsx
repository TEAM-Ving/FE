'use client'

import React from "react";
import Link from "next/link";
import * as styles from './index.css'
import { useParams } from 'next/navigation'

export default function StudioMenu() {
  const params = useParams()

  return (
    <div className={styles.sideMenuContainer}>
      <Link href={`/studio/${params.userId}`}>
        <div className={styles.menuItem}>
          대시보드
        </div>
      </Link>
      <Link href={`/studio/${params.userId}/streaming`}>
        <div className={styles.menuItem}>
          방송하기
        </div>
      </Link>
      <Link href={`/studio/${params.userId}/static`}>
        <div className={styles.menuItem}>
          통계/분석
        </div>
      </Link>
    </div>
  )
}