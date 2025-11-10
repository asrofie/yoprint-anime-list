export function withAbort<TArgs extends any[], R>(
  fn: (...args: [...TArgs, RequestInit?]) => Promise<R>
) {
  let controller: AbortController | null = null
  return async (...args: [...TArgs, RequestInit?]): Promise<R> => {
    if (controller) controller.abort()
    controller = new AbortController()

    const maybeInit = args[args.length - 1] as unknown
    let init: RequestInit | undefined
    let baseArgs: TArgs

    if (typeof maybeInit === 'object' && maybeInit !== null && (
      // heuristics to detect RequestInit-like last arg
      'signal' in (maybeInit as any) || 'method' in (maybeInit as any) || 'headers' in (maybeInit as any) || 'body' in (maybeInit as any)
    )) {
      init = maybeInit as RequestInit
      baseArgs = args.slice(0, -1) as unknown as TArgs
    } else {
      baseArgs = args as unknown as TArgs
    }

    const finalInit: RequestInit = { ...(init || {}), signal: controller.signal }
    const res = await fn(...baseArgs, finalInit)
    controller = null
    return res
  }
}
