'use client'

import { useDispatch } from 'react-redux'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'
import { useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { selectIsModalOpened } from '@/redux/shorts-upload/selector'
import { usePathname, useSearchParams } from 'next/navigation'
import ModalBody from './modal-body'

export default function UploadModal() {
  const dispatch = useDispatch()
  const isModalOpened = useAppSelector(selectIsModalOpened)
  const pathname = usePathname
  const searchParams = useSearchParams()

  const closeHandler = () => {
    dispatch(shortsUploadActions.resetAllState())
    dispatch(shortsUploadActions.setIsModalOpened(false))
  }

  useEffect(() => {
    closeHandler()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pathname, searchParams])

  if (!isModalOpened) return null

  return (
    <div
      className="fixed inset-x-0 bottom-[var(--shorts-header-height)] top-0 z-upload-modal flex flex-col items-center bg-[#7F8493]/80 md:bottom-0"
      onClick={closeHandler}
    >
      <ModalBody key={String(isModalOpened)} closeHandler={closeHandler} />
    </div>
  )
}
