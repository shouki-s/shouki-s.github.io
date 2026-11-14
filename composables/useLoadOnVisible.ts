/** ローディング表示を見せるため、読み込みを始める前にあえて待つ時間 */
const LOADING_DELAY_MS = 200

/**
 * 要素が画面に入ったときに一度だけデータを読み込む。
 * 失敗したときは `error` に理由が入るので、画面側でメッセージを出す。
 */
export function useLoadOnVisible<T>(
  target: Parameters<typeof useIntersectionObserver>[0],
  load: () => Promise<T>,
  initial: T,
): { data: Ref<T>; loading: Ref<boolean>; error: Ref<unknown> } {
  // 読み込んだ結果は丸ごと差し替えるだけで中身は書き換えないので、深いリアクティブ化は不要
  const data = shallowRef(initial)
  const loading = ref(true)
  const error = shallowRef<unknown>(null)

  // 1回の通知に同じ要素の変化が複数まとめて届くことがあるので、すべて見る
  const { stop } = useIntersectionObserver(target, async (entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) {
      return
    }
    stop()
    try {
      await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY_MS))
      data.value = await load()
    } catch (e) {
      console.error(e)
      error.value = e
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
