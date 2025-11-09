import React from 'react'

type Props = { children: React.ReactNode }

type State = { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error } }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error(error, info) }
  render() {
    if (this.state.hasError) {
      return (<div role="alert">Something went wrong: {this.state.error?.message}</div>);
    }
    return this.props.children
  }
}