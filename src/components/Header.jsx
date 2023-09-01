import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, HStack, Image } from "@chakra-ui/react";
import btcPng from "../assets/btc.png";
import { motion } from "framer-motion";

const Header = () => {
  const [scrollToTop, setScrollToTop] = useState(false);
  const [topId, setTopId] = useState("");

  const handleOnClick = (top) => {
    setTopId(`${top}`);
    setScrollToTop(true);
  };
  useEffect(() => {
    window.location.href = `#/${topId}`;
    if (scrollToTop) {
      const element = document.getElementById(`${topId}`);
      if (element) {
        element.scrollIntoView();
        setScrollToTop(false);
      }
    }
  }, [scrollToTop, topId]);

  return (
    <HStack
      p={4}
      shadow={"base"}
      bgColor={"blackAlpha.700"}
      pos={"fixed"}
      w={"full"}
      top={0}
      backdropFilter={"blur(6px)"}
      zIndex={10}
      gap={8}
    >
      <motion.div
        animate={{ rotateZ: "360deg" }}
        transition={{
          ease: "linear",
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Image src={btcPng} objectFit={"contain"} w={10} h={10} />
      </motion.div>

      <Button
        variant={"unstyled"}
        color={"white"}
        onClick={() => handleOnClick("HomeTop")}
        _hover={{ color: "rgb(200,200,200)" }}
      >
        <Link to="/">Home</Link>
      </Button>
      <Button
        variant={"unstyled"}
        color={"white"}
        onClick={() => handleOnClick("ExchangeTop")}
        _hover={{ color: "rgb(200,200,200)" }}
      >
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button
        variant={"unstyled"}
        color={"white"}
        onClick={() => handleOnClick("CoinTop")}
        _hover={{ color: "rgb(200,200,200)" }}
      >
        <Link to="/coins">Coins</Link>
      </Button>
    </HStack>
  );
};

export default Header;
