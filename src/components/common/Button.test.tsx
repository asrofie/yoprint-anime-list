import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

test('renders and clicks', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Search</Button>)
  await user.click(screen.getByRole('button', { name: /search/i }))
  expect(onClick).toHaveBeenCalled()
})