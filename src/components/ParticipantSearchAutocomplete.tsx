import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { SetStateAction, SyntheticEvent, useState } from "react";
import { Components } from "../services/api/openapi";
import { useNavigate } from "react-router-dom";
import { useApiServiceContext } from "../context/ApiContext.tsx";

const ParticipantSearchAutocomplete = () => {
  const [options, setOptions] = useState<
    Components.Schemas.ParticipationSchema[]
  >([]);

  const [inputValue, setInputValue] = useState("");
  const [value] = useState(null);

  const navigate = useNavigate();

  const { getApiClient } = useApiServiceContext();

  const onInputChangeHandle = async (
    _event: SyntheticEvent,
    value: SetStateAction<string>,
  ) => {
    if (value === "") {
      setInputValue("");
    } else if (!isNaN(Number(value.toString()))) {
      setInputValue(value);

      const api = await getApiClient();
      const response = await api.race_api_race_api_get_race_participations({
        bib_number: Number(value.toString()),
        limit: 6,
        race_id: 1,
      });

      setOptions(response.data);
    }
  };

  return (
    <Autocomplete
      sx={{
        my: 1,
        "& .MuiOutlinedInput-root": {
          paddingRight: "12px!important",
        },
      }}
      filterOptions={(x) => x}
      options={options}
      inputValue={inputValue}
      value={value}
      blurOnSelect={true}
      getOptionLabel={(option) => {
        return (
          option.bib_number +
          " | " +
          option.user.first_name +
          " " +
          option.user.last_name
        );
      }}
      onInputChange={(event, value) => {
        void onInputChangeHandle(event, value);
      }}
      onChange={(_event, value) => {
        if (value) {
          navigate(`/participants/${value.user.id}`);
          setInputValue("");
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          label="Bib Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default ParticipantSearchAutocomplete;
