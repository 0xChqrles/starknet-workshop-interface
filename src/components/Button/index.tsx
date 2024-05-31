import { styled } from 'styled-components'

const BaseButton = styled.button<{ large?: boolean; withIcon?: boolean }>`
  border: none;
  border-radius: 6px;
  font-size: 16px;
  min-height: ${({ large = false }) => (large ? '54px' : '40px')};
  padding: ${({ withIcon = false }) => (withIcon ? '8px 20px 8px 16px' : '8px 20px')};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

export const PrimaryButton = styled(BaseButton)`
  background: ${({ theme }) => `linear-gradient(215deg, ${theme.accent2}, ${theme.accent1})`};
  color: ${({ theme }) => theme.white};

  &:active {
    opacity: 0.7;
  }

  &:disabled,
  &[disabled] {
    background: ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.neutral2};
    cursor: default;
  }
`

export const SecondaryButton = styled(BaseButton)`
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.neutral1};
  border: solid 1px ${({ theme }) => theme.neutral2};

  &:active {
    background: ${({ theme }) => theme.bg2}e0;
  }

  &:disabled,
  &[disabled] {
    background: ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.neutral2};
    cursor: default;
  }
`
