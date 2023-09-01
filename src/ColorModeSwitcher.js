import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      color="current"
      marginLeft="2"
      zIndex={"overlay"}
      pos={"fixed"}
      top={"4"}
      right={"4"}
      onClick={toggleColorMode}
      icon={
        text === "light" ? (
          <motion.div
            animate={{ rotateZ: "360deg" }}
            transition={{
              ease: "linear",
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <SwitchIcon />
          </motion.div>
        ) : (
          <SwitchIcon />
        )
      }
      {...props}
    />
  );
};
