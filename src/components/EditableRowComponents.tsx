import { ChangeEventHandler, ReactNode } from "react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { FormikErrors } from "formik";

function EditableRowStackTextField(props: {
  label: string;
  data: string | null | undefined;
  editing: boolean;
  id: string;
  error: string | undefined;
  onChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}) {
  const isError = props.error != undefined;
  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography>{props.label}</Typography>
      {props.editing ? (
        <TextField
          id={props.id}
          label={props.label}
          value={props.data}
          onChange={props.onChange}
          error={isError}
          helperText={isError ? props.error : ""}
          variant="outlined"
          size={"small"}
        />
      ) : (
        <Typography>{props.data ?? ""}</Typography>
      )}
    </Stack>
  );
}

function EditableRowStackSelectField<T extends number | string>(props: {
  label: string;
  value: T | null | undefined;
  valueLabel: string | null | undefined;
  editing: boolean;
  id: string;
  error: string | undefined;
  options: { key: string; value: T }[] | null;
  onChange:
    | ((event: SelectChangeEvent<T | null>, child: ReactNode) => void)
    | undefined;
}) {
  const isError = props.error != undefined;
  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography>{props.label}</Typography>
      {props.editing ? (
        props.options == null ? (
          <Skeleton variant={"text"} />
        ) : (
          <FormControl>
            <InputLabel id={`label-for-${props.id}`}>{props.label}</InputLabel>
            <Select
              name={props.id}
              id={props.id}
              labelId={`label-for-${props.id}`}
              error={isError}
              label={props.label}
              value={props.value}
              onChange={props.onChange}
              variant="outlined"
              size={"small"}
              sx={{ minWidth: 100 }}
            >
              {props.options.map(({ key, value }) => {
                return (
                  <MenuItem key={value} value={value}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )
      ) : (
        <Typography>{props.valueLabel}</Typography>
      )}
    </Stack>
  );
}

function EditableRowStackMultiSelectField<T extends number | string>(props: {
  label: string;
  value: T[] | null | undefined;
  valueLabel: string | null | undefined;
  editing: boolean;
  id: string;
  error: string | undefined;
  options: { key: string; value: T }[] | null;
  onChange:
    | ((event: SelectChangeEvent<T[] | null>, child: ReactNode) => void)
    | undefined;
}) {
  const isError = props.error != undefined;

  const renderValues = (selected: T[]) => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((value) => (
          <Chip
            key={value}
            label={
              props.options?.find((option) => option.value == value)?.key ?? ""
            }
          />
        ))}
      </Box>
    );
  };

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography>{props.label}</Typography>
      {props.editing ? (
        props.options == null ? (
          <Skeleton variant={"text"} />
        ) : (
          <FormControl>
            <InputLabel id={`label-for-${props.id}`}>{props.label}</InputLabel>
            <Select
              name={props.id}
              id={props.id}
              labelId={`label-for-${props.id}`}
              error={isError}
              label={props.label}
              value={props.value}
              //@ts-expect-error We know we will get a list of T
              renderValue={renderValues}
              onChange={props.onChange}
              variant="outlined"
              size={"small"}
              sx={{ minWidth: 100 }}
              multiple
            >
              {props.options.map(({ key, value }) => {
                return (
                  <MenuItem key={value} value={value}>
                    <Checkbox
                      checked={(props.value?.indexOf(value) ?? -2) > -1}
                    />
                    <ListItemText primary={key} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )
      ) : (
        <Typography>{props.valueLabel}</Typography>
      )}
    </Stack>
  );
}

function EditableRowStackNumberField(props: {
  label: string;
  data: number | null | undefined;
  editing: boolean;
  id: string;
  error: string | undefined;
  onChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}) {
  const isError = props.error != undefined;
  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography>{props.label}</Typography>
      {props.editing ? (
        <TextField
          type={"number"}
          id={props.id}
          error={isError}
          label={props.label}
          helperText={isError ? props.error : ""}
          value={props.data}
          onChange={props.onChange}
          variant="outlined"
          size={"small"}
        />
      ) : (
        <Typography>{props.data ?? ""}</Typography>
      )}
    </Stack>
  );
}

function EditableRowStackTimeField(props: {
  label: string;
  data: DateTime;
  editing: boolean;
  id: string;
  error: FormikErrors<DateTime<true> | DateTime<false>> | undefined;
  setFieldValue: (arg0: string, arg1: DateTime | null, arg2: boolean) => void;
}) {
  const isError = props.error != undefined;
  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography>{props.label}</Typography>
      {props.editing ? (
        <TimePicker
          label={props.label}
          value={props.data}
          name={props.id}
          onChange={(value) => {
            props.setFieldValue(props.id, value, true);
          }}
          slotProps={{
            textField: {
              error: isError,
              size: "small",
              helperText: isError ? props.error?.invalidReason : "",
            },
          }}
        />
      ) : (
        <Typography>{props.data.toFormat("t")}</Typography>
      )}
    </Stack>
  );
}

function EditableRowStackSwitch(props: {
  label: string;
  checked: boolean | undefined;
  editing: boolean;
  id: string;
  onChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}) {
  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography>{props.label}</Typography>
      {props.editing ? (
        <Switch
          id={props.id}
          checked={props.checked}
          onChange={props.onChange}
          size={"small"}
        />
      ) : (
        <Typography>{props.checked ? "Yes" : "No"}</Typography>
      )}
    </Stack>
  );
}

export {
  EditableRowStackSwitch,
  EditableRowStackTextField,
  EditableRowStackSelectField,
  EditableRowStackNumberField,
  EditableRowStackTimeField,
  EditableRowStackMultiSelectField,
};
