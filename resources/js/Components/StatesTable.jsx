import { router, useForm } from "@inertiajs/react";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useMemo } from "react";

const StatesTable = ({ states, country }) => {
  const { data, setData, errors, processing, post } = useForm({
    name: "",
    country_id: 0,
    code: "",
    bagian: "",
    kepulauan_code: "",
  });

  const dataCountry = country.map((v) => {
    return { label: v.name, value: v.id };
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
        accessorKey: "kepulauan_code",
        header: "Kepulauan Code",
      },
      {
        accessorKey: "country.name",
        header: "Country",
      },
      {
        accessorKey: "bagian",
        header: "Bagian",
      },
    ],
    []
  );

  const submit = (e) => {
    e.preventDefault();
    post("/state", {
      onSuccess: () => table.setCreatingRow(false),
      preserveScroll: true,
      preserveState: true,
    });
  };

  const table = useMantineReactTable({
    columns,
    data: states,
    enableStickyHeader: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        leftIcon={<IconPlus />}
        onClick={() => table.setCreatingRow(true)}
      >
        Create State
      </Button>
    ),
    renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack component="form" onSubmit={submit}>
        <Title order={3}>Create New State</Title>
        <Select
          value={data.country_id}
          onChange={(e) => setData("country_id", e)}
          searchable
          label="Country"
          placeholder="pick one"
          data={dataCountry}
          error={errors.country_id}
        />
        <TextInput
          label="Name"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          error={errors.name}
        />
        <NumberInput
          label="Code"
          value={data.code}
          onChange={(e) => setData("code", e)}
          error={errors.code}
        />
        <TextInput
          label="Bagian"
          value={data.bagian}
          onChange={(e) => setData("bagian", e.target.value)}
          error={errors.bagian}
        />
        <NumberInput
          label="Kepulauan Code"
          value={data.kepulauan_code}
          onChange={(e) => setData("kepulauan_code", e)}
          error={errors.kepulauan_code}
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
        <ActionIcon onClick={() => router.get(`/state/${row.original.id}`)}>
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

export default StatesTable;
