import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('List Component', () => {
  it('should render list items', async () => {
    const { getByText, queryByText, rerender } = render(<List initialItems={['Giselle', 'Diego', 'Mary']} />)

    expect(getByText('Giselle')).toBeInTheDocument()
    expect(getByText('Diego')).toBeInTheDocument()
    expect(getByText('Mary')).toBeInTheDocument()
  })

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText } = render(<List initialItems={[]} />)

    const inputElement = getByPlaceholderText('Novo Item')
    // find button element
    const addButton = getByText('Add')
    // simulate user input
    await userEvent.type(inputElement, 'New Person')
    // allows you to fire functions within the application interface
    await userEvent.click(addButton)

    // findByText is a function that returns a promise
    //expect(await findByText('New Person')).toBeInTheDocument()
    await waitFor(async () => {
      expect(getByText('New Person')).toBeInTheDocument()
    })
  })

  it('should be able to remove item from the list', async () => {
    const { getAllByText, queryByText } = render(<List initialItems={['Giselle']} />)

    const removeButtons = getAllByText('Remove')
    
    await userEvent.click(removeButtons[0])

    await waitFor(() => {
      expect(queryByText('Giselle')).not.toBeInTheDocument()
    })
  })
})