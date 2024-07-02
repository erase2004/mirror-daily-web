import { fetchLatestPost, fetchPopularPost, fetchLiveEvent } from '@/app/action'
import type { ParameterOfComponent } from '@/types/common'

import SectionDivider from './_components/divider'
import TopNewsSection from './_components/top-news/section'
import LatestNewsSection from './_components/latest-news/section'

export default async function Home() {
  const liveEvent = await fetchLiveEvent()
  const latestPosts = await fetchLatestPost(0)
  const popularPosts = await fetchPopularPost()

  let startIndexOfLatestNewsSection: number = 0

  let latestList: ParameterOfComponent<
    typeof TopNewsSection
  >['postsOfTab']['Latest'] = [undefined]

  if (liveEvent) {
    startIndexOfLatestNewsSection = 9
    latestList = [
      liveEvent,
      ...latestPosts.slice(0, startIndexOfLatestNewsSection),
    ]
  } else {
    const first = latestPosts[0]

    if (first) {
      startIndexOfLatestNewsSection = 10
      latestList = [
        {
          postName: first.postName,
          heroImage: first.heroImage,
          link: first.link,
        },
        ...latestPosts.slice(1, startIndexOfLatestNewsSection),
      ]
    }
  }

  let hotList: ParameterOfComponent<
    typeof TopNewsSection
  >['postsOfTab']['Hot'] = [undefined]

  {
    const first = popularPosts[0]

    if (first) {
      hotList = [
        {
          postName: first.postName,
          heroImage: first.heroImage,
          link: first.link,
        },
        ...popularPosts.slice(1, 9),
      ]
    }
  }

  const postsOfTab: ParameterOfComponent<typeof TopNewsSection>['postsOfTab'] =
    {
      Latest: latestList,
      Hot: hotList,
    }

  return (
    <main className="flex w-full grow flex-col items-center justify-center">
      <SectionDivider customClasses="hidden md:block" />
      <div className="h-10 w-full bg-slate-200">
        {/* 編輯精選（5則輪播） */}
      </div>
      <SectionDivider />
      {/* 即時新聞/熱門新聞（10則） */}
      <TopNewsSection postsOfTab={postsOfTab} />
      <SectionDivider />
      {/* 短影音新聞 */}
      <SectionDivider customClasses="hidden" />
      {/* Topic（4則）＋遊戲區 */}
      <SectionDivider customClasses="hidden" />
      {/* 短影音．二創 */}
      <SectionDivider />
      {/* 最新新聞 */}
      <LatestNewsSection
        initialList={latestPosts.slice(startIndexOfLatestNewsSection)}
      />
    </main>
  )
}
