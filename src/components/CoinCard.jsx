import React from "react";
import { Link } from "react-router-dom";
import { VStack, Image, Heading, Text, useColorMode } from "@chakra-ui/react";
const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  return (
    <Link to={`/coin/${id}`}>
      <VStack
        w={52}
        shadow={"lg"}
        p={8}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={4}
        css={
          isDarkMode
            ? {
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "black",
                  backgroundColor: "white",
                },
              }
            : {
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "white",
                  backgroundColor: "black",
                },
              }
        }
      >
        <Image src={img} w={10} h={10} objectFit={"contain"} alt={"Exchange"} />
        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>

        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
