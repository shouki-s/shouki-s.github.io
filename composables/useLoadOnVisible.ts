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
  // Contentful のエントリは循環参照を含みうるので、中身まではリアクティブにしない
  const data = shallowRef(initial)
  const loading = ref(true)
  const error = shallowRef<unknown>(null)

  const { stop } = useIntersectionObserver(target, async ([entry]) => {
    if (!entry?.isIntersecting) {
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
