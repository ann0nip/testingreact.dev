import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'

import Checkbox from '../../../components/Checkbox'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */
describe('The <Checkbox /> component', () => {
  const defaultProps = {
    label: 'string',
    id: 'string',
    checked: false,
    onChange: jest.fn(),
  }
  const setupCheckbox = (props = defaultProps) =>
    render(<Checkbox {...props} />)

  it('❌ Should render the label and checkbox the user will see', () => {
    const { asFragment } = setupCheckbox()

    expect(asFragment()).toMatchSnapshot()
  })

  it('❌ Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    const { getByLabelText } = setupCheckbox()

    expect(getByLabelText(defaultProps.label)).toBeInTheDocument()
  })

  it('❌ Should call the onChange handler when it is provided', () => {
    const { getByLabelText } = setupCheckbox()
    const checkbox = getByLabelText(defaultProps.label)

    fireEvent.click(checkbox)

    expect(defaultProps.onChange).toBeCalled()
  })

  it('❌ Should change state correctly when clicked (checked and unchecked)', () => {
    const { getByLabelText } = setupCheckbox({ ...defaultProps, checked: true })
    const checkbox = getByLabelText(defaultProps.label)

    expect(checkbox).toBeChecked()
  })

  it('❌ should not fail any accessibility tests', async () => {
    const { container } = setupCheckbox()

    expect(await axe(container)).toHaveNoViolations()
  })
})
