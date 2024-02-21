import StepCardLayout from "./StepCardLayout.tsx";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DateTime, Duration } from "luxon";
import { useQuery } from "@tanstack/react-query";
import { useApiServiceContext } from "../../context/ApiContext.tsx";

const CreateParticipantStep = (props: {
  userId: number;
  raceId: number;
  handleSuccess: () => void;
}) => {
  const { getApiClient } = useApiServiceContext();

  const ParticipantFormSchema = Yup.object({
    bibNo: Yup.number()
      .required()
      .positive("Must be positive!")
      .integer("Must be a full integer!"),
    isFtt: Yup.boolean().required(),
    team: Yup.string(),
    swimTime: Yup.object().required(),
    city: Yup.string(),
    province: Yup.string(),
    country: Yup.string(),
    raceType: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      bibNo: 0,
      isFtt: false,
      team: "",
      swimTime: Duration.fromObject({ minutes: 0 }),
      city: "",
      province: "",
      country: "",
      raceType: 0,
    },
    validationSchema: ParticipantFormSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      const apiClient = await getApiClient();
      await apiClient.participants_api_create_participant(
        { user_id: props.userId },
        {
          bib_number: values.bibNo,
          is_ftt: values.isFtt,
          team: values.team,
          swim_time: values.swimTime.toISO(),
          origin: {
            city: values.city,
            province: values.province,
            country: values.country,
          },
          race_id: props.raceId,
          race_type_id: values.raceType,
        },
      );

      props.handleSuccess();
    },
  });

  const raceTypesQuery = useQuery({
    queryKey: ["raceTypes"],
    queryFn: () =>
      getApiClient()
        .then((client) => client.race_api_get_race_types())
        .then((res) => res.data),
  });

  return (
    <StepCardLayout
      instructions={
        "Finally, complete the participant information for the race."
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            type={"number"}
            id={"bibNo"}
            label={"Bib Number"}
            error={formik.errors.bibNo != undefined && formik.touched.bibNo}
            helperText={
              formik.errors.bibNo != undefined && formik.touched.bibNo
                ? formik.errors.bibNo
                : ""
            }
            onChange={formik.handleChange}
          />
          <TextField
            type={"text"}
            id={"team"}
            label={"Team"}
            error={formik.errors.team != undefined && formik.touched.team}
            helperText={
              formik.errors.team != undefined && formik.touched.team
                ? formik.errors.team
                : ""
            }
            onChange={formik.handleChange}
          />

          <TextField
            type={"text"}
            id={"city"}
            label={"City"}
            error={formik.errors.city != undefined && formik.touched.city}
            helperText={
              formik.errors.city != undefined && formik.touched.city
                ? formik.errors.city
                : ""
            }
            onChange={formik.handleChange}
          />
          <TextField
            type={"text"}
            id={"province"}
            label={"Province"}
            error={
              formik.errors.province != undefined && formik.touched.province
            }
            helperText={
              formik.errors.province != undefined && formik.touched.province
                ? formik.errors.province
                : ""
            }
            onChange={formik.handleChange}
          />
          <TextField
            type={"text"}
            id={"country"}
            label={"Country"}
            error={formik.errors.country != undefined && formik.touched.country}
            helperText={
              formik.errors.country != undefined && formik.touched.country
                ? formik.errors.country
                : ""
            }
            onChange={formik.handleChange}
          />

          <TimePicker
            label={"Swim Time"}
            value={DateTime.fromISO(formik.values.swimTime.toISOTime())}
            name={"swimTime"}
            onChange={(value) => {
              void formik.setFieldValue(
                "swimTime",
                Duration.fromISOTime(
                  value?.toISOTime({
                    includePrefix: true,
                    includeOffset: false,
                  }) ?? "",
                ),
                true,
              );
            }}
            views={["minutes", "seconds"]}
            format={"mm:ss"}
            slotProps={{
              textField: {
                error:
                  formik.errors.swimTime != undefined &&
                  formik.touched.swimTime != undefined,
                helperText:
                  formik.errors.swimTime != undefined &&
                  formik.touched.swimTime != undefined
                    ? formik.errors.swimTime.invalidReason
                    : "",
              },
            }}
          />

          <FormControlLabel
            control={
              <Switch
                id={"isFtt"}
                checked={formik.values.isFtt}
                onChange={formik.handleChange}
              />
            }
            label={"Is FTT"}
          />

          {raceTypesQuery.isLoading ? (
            <Skeleton variant={"rectangular"} />
          ) : raceTypesQuery.isError || !raceTypesQuery.data ? (
            <>Error...</>
          ) : (
            <FormControl>
              <InputLabel id={`label-for-raceType`}>Race Type</InputLabel>
              <Select
                name={"raceType"}
                id={"raceType"}
                labelId={`label-for-raceType`}
                error={
                  formik.errors.raceType != undefined && formik.touched.raceType
                }
                label={"Race Type"}
                value={formik.values.raceType}
                onChange={formik.handleChange}
                sx={{ minWidth: 100 }}
              >
                {raceTypesQuery.data.map((raceType) => {
                  if (raceType.id && raceType.name) {
                    return (
                      <MenuItem key={raceType.id} value={raceType.id}>
                        {raceType.name}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </Select>
            </FormControl>
          )}

          {formik.isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button type={"submit"} color={"success"}>
              Finish
            </Button>
          )}
        </Stack>
      </form>
    </StepCardLayout>
  );
};

export default CreateParticipantStep;
