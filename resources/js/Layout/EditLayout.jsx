import { Link } from "@inertiajs/react";
import { Box, Button, Flex } from "@mantine/core";
import { IconArrowBarToLeft } from "@tabler/icons-react";
import React from "react";

const EditLayout = ({ children }) => {
  return (
    <Box maw={"90%"} mx={"auto"}>
      <Flex align={"center"} justify={"space-between"}>
        <h1>Assessment MDP</h1>
        <Button leftIcon={<IconArrowBarToLeft />} component={Link} href="/">
          Back
        </Button>
      </Flex>
      <Box mt={8}>{children}</Box>
    </Box>
  );
};

export default EditLayout;
