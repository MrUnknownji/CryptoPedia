import { useState, useEffect } from "react";
import { server } from "../index";
import axios from "axios";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;
  return (
    <Container maxW={'container.xl'} id="ExchangeTop" pt={20}>
      {loading ? (
        <Loader />
      ) : (
          <>
            <Text textAlign={"center"}
            fontSize={'2xl'} fontWeight={'semibold'} margin={'3'}>Top 100 plateforms to exchange your currency</Text>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  return (
    <a href={url} target="blank">
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
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchange;
