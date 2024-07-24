import { fetchLatestShorts } from '@/app/actions'
import ShortsList from './list'
import { SHORTS_TYPE } from '@/types/common'

export default async function ShortsDerivativeSection() {
  const items = await fetchLatestShorts(SHORTS_TYPE.DERIVATIVE)

  if (!items.length) return null

  return (
    <section className="mb-[34px] mt-9 w-full max-w-screen-sm md:mb-9 md:mt-6 md:max-w-screen-md lg:my-9 lg:max-w-none">
      <div className="flex items-center gap-x-3 md:gap-x-6">
        <p className="inline-block pl-[23px] text-base font-bold leading-normal text-[#FF5A36] md:pl-5 lg:pl-9 lg:text-lg">
          短影音．二創
        </p>
        <button className="rounded-[29px] bg-[#D94141] px-[10px] py-[2.5px] text-[15px] font-normal leading-[23px] text-white">
          {/* TODO: add click handler */}
          我要投稿
        </button>
      </div>
      <ShortsList customClass="mt-[17px]" customColor="#FF5A36" items={items} />
    </section>
  )
}
