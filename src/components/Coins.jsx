import { useState, useEffect } from "react";
import { server } from "../index";
import axios from "axios";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import {
  Container,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import CoinCard from "./CoinCard";
import { PaginationItem } from "@mui/material";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const totalPages = 100;

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (event, newPage) => {
    setCurrentPage(newPage);
    setLoading(true);
  };

  const paginationTheme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          root: {
            "& button, .MuiPaginationItem-ellipsis": {
              color: isDarkMode ? "white" : "black",
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${currentPage}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, currentPage]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;
  return (
    <Container maxW={"container.xl"} id="CoinTop" pt={20}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text
            textAlign={"center"}
            fontWeight={"semibold"}
            margin={2}
            fontSize={"2xl"}
          >
            Get the all details about any coin just by clicking that.
          </Text>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <Stack align={"center"} margin={"2rem 0px"}>
            <ThemeProvider theme={paginationTheme}>
              <Pagination
                count={totalPages}
                page={currentPage}
                variant={"text"}
                shape={"rounded"}
                onChange={changePage}
                hidePrevButton={currentPage === 1}
                hideNextButton={currentPage === totalPages}
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    disabled={item.page === currentPage}
                    sx={{
                      "&.MuiPaginationItem-root.Mui-disabled": {
                        color: isDarkMode ? "black" : "white",
                        backgroundColor: isDarkMode ? "white" : "black",
                      },
                    }}
                  />
                )}
              />
            </ThemeProvider>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Coins;
