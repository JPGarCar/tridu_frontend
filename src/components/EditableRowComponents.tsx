import {ChangeEventHandler, ReactNode} from "react";
import {MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography} from "@mui/material";

function EditableRowStackTextField(props: {
    label: string,
    data: string | null | undefined,
    editing: boolean,
    id: string,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}) {
    return (
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography>{props.label}</Typography>
            {
                props.editing ?
                    <TextField id={props.id} label={props.label} value={props.data} onChange={props.onChange}
                               variant="outlined" size={'small'}/> : <Typography>{props.data ?? ""}</Typography>
            }
        </Stack>
    );
}

function EditableRowStackSelectField<T extends number | string>(props: {
    label: string,
    value: T | null | undefined,
    valueLabel: string | null | undefined,
    editing: boolean,
    id: string,
    options: { key: string; value: T; }[],
    onChange: ((event: SelectChangeEvent<T | null>, child: ReactNode) => void) | undefined
}) {
    return (
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography>{props.label}</Typography>
            {
                props.editing ? <Select name={props.id} id={props.id} label={props.label} value={props.value} onChange={props.onChange} variant="outlined" size={'small'} >
                    {
                        props.options.map(({key, value}) => {
                            return <MenuItem key={value} value={value}>{key}</MenuItem>
                        })
                    }
                </Select> : <Typography>{props.valueLabel}</Typography>
            }
        </Stack>
    );
}

function EditableRowStackNumberField(props: {
    label: string,
    data: number | null | undefined,
    editing: boolean,
    id: string,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined}) {
    return (
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography>{props.label}</Typography>
            {
                props.editing ? <TextField type={"number"} id={props.id} label={props.label} value={props.data} onChange={props.onChange} variant="outlined" size={'small'} /> : <Typography>{props.data ?? ""}</Typography>
            }
        </Stack>
    );
}

function EditableRowStackSwitch(props: {
    label: string,
    checked: boolean | undefined,
    editing: boolean,
    id: string,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined}) {
    return (
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography>{props.label}</Typography>
            {
                props.editing ? <Switch id={props.id} checked={props.checked} onChange={props.onChange} size={'small'} /> : <Typography>{props.checked ? "Yes" : "No"}</Typography>
            }
        </Stack>
    );
}

export {
    EditableRowStackSwitch,
    EditableRowStackTextField,
    EditableRowStackSelectField,
    EditableRowStackNumberField
}