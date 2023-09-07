import { Head } from "@inertiajs/react";
import { Box, Center, Stack, Tabs } from "@mantine/core";
import { IconFlag, IconGlobe } from "@tabler/icons-react";
import React from "react";
import CountriesTable from "../Components/CountriesTable";
import StatesTable from "../Components/StatesTable";

const Welcome = ({ country, states }) => {
  return (
    <>
      <Head>
        <title>Assessment</title>
      </Head>
      <Tabs defaultValue="countries">
        <Tabs.List position="center">
          <Tabs.Tab icon={<IconFlag />} value="countries">
            Countries
          </Tabs.Tab>
          <Tabs.Tab icon={<IconGlobe />} value="states">
            States
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="countries">
          <Center>
            <Box w="90%">
              <Stack>
                <h1>Countries Data</h1>
                <Box>
                  <CountriesTable country={country} />
                </Box>
              </Stack>
            </Box>
          </Center>
        </Tabs.Panel>
        <Tabs.Panel value="states">
          <Center>
            <Box w="90%">
              <Stack>
                <h1>States Data</h1>
                <Box>
                  <StatesTable states={states} country={country} />
                </Box>
              </Stack>
            </Box>
          </Center>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Welcome;
