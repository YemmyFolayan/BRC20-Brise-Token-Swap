import React from 'react'
import { Box, Flex, Text, PancakeToggle, useMatchBreakpoints } from '@nguyenphu27/uikit'
import { useAudioModeManager } from 'state/user/hooks'
import useTheme from '../../hooks/useTheme'

type AudioSettingModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const AudioSetting = ({ translateString }: AudioSettingModalProps) => {
  const { isSm, isXs } = useMatchBreakpoints()
  const { toggleTheme } = useTheme()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()

  return (
    <Box mb="16px">
      <Flex alignItems="center" mb="8px">
        <Text bold>{translateString(999, 'Dark Mode')}</Text>
      </Flex>
      <Box>
        <PancakeToggle scale={isSm || isXs ? 'sm' : 'md'} checked={audioPlay} onChange={() => { toggleTheme(); toggleSetAudioMode() }} />
      </Box>
    </Box>
  )
}

export default AudioSetting
