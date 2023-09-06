import { router, useForm } from "@inertiajs/react";
import {
  ActionIcon,
  Button,
  Flex,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import StatesTable from "../../Components/StatesTable";
import EditLayout from "../../Layout/EditLayout";

const CountryDetail = ({ countryData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, reset, put, errors, clearErrors, processing } =
    useForm({
      name: countryData.name,
      code: countryData.code,
      continent: countryData.continent,
    });

  const submit = (e) => {
    e.preventDefault();
    put(`/country/${countryData.id}`, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onSuccess: () => setIsEditing(false),
    });
  };

  return (
    <Paper p={"lg"} shadow="lg" withBorder maw={{ sm: "100%", md: "80%" }}>
      <h2>Country Manage</h2>
      <Flex gap={4}>
        <img src={`https://flagsapi.com/${countryData.code}/flat/64.png`} />
        <h3>{countryData.name}</h3>
      </Flex>
      <Stack component="form" onSubmit={submit} mb="lg">
        <Flex justify={"end"} gap={4}>
          {!isEditing && (
            <>
              <ActionIcon onClick={() => setIsEditing(true)}>
                <IconEdit />
              </ActionIcon>
              <ActionIcon
                onClick={() => router.delete(`/country/${countryData.id}`)}
              >
                <IconTrash />
              </ActionIcon>
            </>
          )}
        </Flex>
        <TextInput
          onChange={(e) => setData("name", e.target.value)}
          disabled={!isEditing}
          value={data.name}
          label="Name"
          error={errors.name}
        />
        <TextInput
          onChange={(e) => setData("code", e.target.value)}
          disabled={!isEditing}
          value={data.code}
          label="Code"
          error={errors.code}
        />
        <TextInput
          disabled={!isEditing}
          value={data.continent}
          onChange={(e) => setData("continent", e.target.value)}
          label="Continent"
          error={errors.continent}
        />
        {isEditing && (
          <Flex gap="md" ml={"auto"}>
            <Button
              variant="subtle"
              disabled={processing}
              onClick={() => {
                reset();
                setIsEditing(false);
                clearErrors();
              }}
            >
              Cancel
            </Button>
            <Button loading={processing} type="submit">
              Save
            </Button>
          </Flex>
        )}
      </Stack>
      <StatesTable country={[countryData]} states={countryData.states} />
    </Paper>
  );
};

CountryDetail.layout = (page) => <EditLayout>{page}</EditLayout>;
export default CountryDetail;
