import React, { useCallback } from 'react'
import { ThemedText } from 'src/theme/components'
import styled from 'styled-components'

import { Row } from '../Flex'

function InputBase({ onUserInput, ...props }: InputProps) {
  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onUserInput(event.target.value)
    },
    [onUserInput]
  )

  return <input onChange={handleInput} {...props} />
}

const InputWrapper = styled(Row)<{ prefixed: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border1};
  border-radius: 6px;
  box-sizing: border-box;
  padding: ${({ prefixed }) => (prefixed ? '0 20px 0 12px' : '0 20px')};

  &:focus-within {
    outline: ${({ theme }) => theme.accent1} solid 2px;
    outline-offset: -1px;
  }
`

const StyledInput = styled(InputBase)`
  border: none;
  background: transparent;
  font-size: 16px;
  width: 100%;
  outline: none;
  height: 55px;
  color: ${({ theme }) => theme.neutral1};

  :disabled {
    color: ${({ theme }) => theme.neutral2};
  }

  &::placeholder {
    color: ${({ theme }) => theme.neutral2};
  }

  :-webkit-autofill,
  :-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onUserInput: (value: string) => void
  prefix?: string
}

export default function Input({ prefix, onUserInput, className, ...props }: InputProps) {
  return (
    <InputWrapper prefixed={!!prefix} className={className}>
      {prefix && <ThemedText.BodySecondary>{prefix}&nbsp;</ThemedText.BodySecondary>}
      <StyledInput onUserInput={onUserInput} {...props} />
    </InputWrapper>
  )
}
