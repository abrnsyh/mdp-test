import { Link, useForm } from "@inertiajs/react";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useMemo } from "react";

const CountriesTable = ({ country }) => {
  const { data, setData, errors, processing, post } = useForm({
    name: "",
    code: "",
    continent: "",
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "code",
        header: "Code",
      },
      {
        accessorKey: "continent",
        header: "Continent",
      },
    ],
    []
  );

  const submit = (e) => {
    e.preventDefault();
    post("/country", {
      onSuccess: () => table.setCreatingRow(false),
      preserveScroll: true,
      preserveState: true,
    });
  };

  const table = useMantineReactTable({
    columns,
    data: country,
    enableStickyHeader: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        leftIcon={<IconPlus />}
        onClick={() => table.setCreatingRow(true)}
      >
        Create
      </Button>
    ),
    renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack component="form" onSubmit={submit}>
        <Title order={3}>Create New Country</Title>
        <TextInput
          label="Name"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          error={errors.name}
        />
        <TextInput
          label="Code"
          value={data.code}
          onChange={(e) => setData("code", e.target.value)}
          error={errors.code}
        />
        <TextInput
          label="continent"
          value={data.continent}
          onChange={(e) => setData("continent", e.target.value)}
          error={errors.continent}
        />
        <Flex justify="flex-end" mt="xl" gap={8}>
          <Button
            disabled={processing}
            variant="subtle"
            onClick={() => table.setCreatingRow(false)}
          >
            Cancel
          </Button>
          <Button loading={processing} type="submit">
            Save
          </Button>
        </Flex>
      </Stack>
    ),
    renderRowActions: ({ row }) => (
      <Box>
        <ActionIcon component={Link} href={`/country/${row.original.id}`}>
          <IconEdit />
        </ActionIcon>
      </Box>
    ),
    enableRowActions: true,
    initialState: {
      isSaving: processing,
    },
  });

  return <MantineReactTable table={table} />;
};

export default CountriesTable;
