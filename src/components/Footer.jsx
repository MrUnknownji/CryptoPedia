import React from 'react';
import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react';

const avatarSrc = "https://avatars.githubusercontent.com/u/95078278?v=4";
const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={48}
      px={16}
      py={[16, 8]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            We are one of the best crypto trading app in India, we provide our
            guidence at a very cheap price.
          </Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            Special thanks to{" "}
            <a href="https://www.coingecko.com/" style={{display:'inline-block'}}>
              <Text color={"blue"} fontWeight={"bold"}>
                CoinGecko
              </Text>
            </a>{" "}
            for powering our cryptocurrency data!{" "}
          </Text>
        </VStack>
        <VStack>
          <Avatar boxSize={28} mt={[4, 0]} src={avatarSrc} />
          <Text>Sandeepkhati@gmail.com</Text>
          <a
            href="https://github.com/MrUnknownji"
            style={{ transition: "all 0.3s ease" }}
            onMouseOver={(e) => {
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "inherit";
            }}
          >
            Github &rarr;
          </a>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;