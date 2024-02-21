import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { SetStateAction, SyntheticEvent, useState } from "react";
import { Components } from "../services/api/openapi";
import { useNavigate } from "react-router-dom";
import { useApiServiceContext } from "../context/ApiContext.tsx";

const SearchAutocomplete = () => {
  const [options, setOptions] = useState<Components.Schemas.UserSchema[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [value] = useState(null);

  const navigate = useNavigate();

  const { getApiClient } = useApiServiceContext();

  const onInputChangeHandle = async (
    _event: SyntheticEvent,
    value: SetStateAction<string>,
  ) => {
    setInputValue(value);

    const api = await getApiClient();
    const response = await api.accounts_api_get_active_non_staff_users({
      name: value.toString(),
      limit: 8,
    });

    setOptions(response.data.items);
  };

  return (
    <Autocomplete
      sx={{ my: 1 }}
      filterOptions={(x) => x}
      options={options}
      inputValue={inputValue}
      value={value}
      blurOnSelect={true}
      getOptionLabel={(option) => {
        return option.first_name + " " + option.last_name;
      }}
      onInputChange={(event, value) => {
        void onInputChangeHandle(event, value);
      }}
      onChange={(_event, value) => {
        if (value) {
          navigate(`/participants/${value.id}`);
          setInputValue("");
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          label="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                {" "}
                <Search />{" "}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchAutocomplete;
