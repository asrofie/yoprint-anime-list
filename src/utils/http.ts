export function withAbort<T extends any[], R>(fn: (...args: T) => Promise<R>) {
  let controller: AbortController | null = null
  return async (...args: T & [init?: RequestInit]) => {
    if (controller) controller.abort()
    controller = new AbortController()
    const init = (args[args.length - 1] as any) || {}
    const res = await fn(...(args as any), { ...init, signal: controller.signal })
    controller = null
    return res
  }
}