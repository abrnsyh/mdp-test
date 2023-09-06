import { router, useForm } from "@inertiajs/react";
import {
  ActionIcon,
  Button,
  Flex,
  NumberInput,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import EditLayout from "../../Layout/EditLayout";

const StateDetail = ({ stateData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, reset, put, errors, clearErrors, processing } =
    useForm({
      name: stateData.name || "",
      code: parseInt(stateData.code) || "",
      bagian: stateData.bagian || "",
      kepulauan_code: parseInt(stateData.kepulauan_code) || "",
      country_id: parseInt(stateData.country_id) || "",
    });

  console.log(data);
  const submit = (e) => {
    e.preventDefault();
    put(`/state/${stateData.id}`, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onSuccess: () => setIsEditing(false),
    });
  };

  return (
    <Paper p={"lg"} shadow="lg" withBorder maw={{ sm: "100%", md: "80%" }}>
      <h2>State Manage</h2>
      <Flex gap={4}>
        <img
          src={`https://flagsapi.com/${stateData.country.code}/flat/64.png`}
        />
        <h3>{stateData.name}</h3>
      </Flex>
      <Stack component="form" onSubmit={submit} mb="lg">
        <Flex justify={"end"} gap={4}>
          {!isEditing && (
            <>
              <ActionIcon onClick={() => setIsEditing(true)}>
                <IconEdit />
              </ActionIcon>
              <ActionIcon
                onClick={() => router.delete(`/state/${stateData.id}`)}
              >
                <IconTrash />
              </ActionIcon>
            </>
          )}
        </Flex>
        {/* <Select
          value={data.country_id}
          onChange={(e) => setData("country_id", e)}
          disabled={!isEditing}
          searchable
          label="Country"
          placeholder="pick one"
          data={dataCountry}
          error={errors.country_id}
        /> */}
        <TextInput
          label="Name"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          disabled={!isEditing}
          error={errors.name}
        />
        <NumberInput
          label="Code"
          value={data.code}
          onChange={(e) => setData("code", e)}
          disabled={!isEditing}
          error={errors.code}
        />
        <TextInput
          label="Bagian"
          value={data.bagian}
          onChange={(e) => setData("bagian", e.target.value)}
          disabled={!isEditing}
          error={errors.bagian}
        />
        <NumberInput
          label="Kepulauan Code"
          value={data.kepulauan_code}
          onChange={(e) => setData("kepulauan_code", e)}
          disabled={!isEditing}
          error={errors.kepulauan_code}
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
    </Paper>
  );
};

StateDetail.layout = (page) => <EditLayout>{page}</EditLayout>;

export default StateDetail;
