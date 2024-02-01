import {Box, Card, IconButton, Typography} from "@mui/material";
import {Components} from "../services/api/openapi";
import {DateTime} from "luxon";
import {Delete} from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import {getApiClient} from "../services/api/api.ts";
import {useSnackbarServiceContext} from "../context/SnackbarContext.tsx";


function CommentCard(props: {comment: Components.Schemas.ParticipantCommentSchema, onCommentDelete: () => void}) {

    const dateCreated = DateTime.fromISO(props.comment.creation_date);

    const { pushAlert } = useSnackbarServiceContext();

    const handleOnClickDelete = async () => {
        const api = await getApiClient();
        const response = await api.participants_api_delete_participant_comment(
                        // @ts-expect-error I dont know why this doesnt work
            { comment_id: props.comment.id ?? undefined }
        );

        if (response.status === 200) {
            pushAlert("Comment deleted.", "success");
            props.onCommentDelete();
        }
    }

    return (
        <Card key={props.comment.id}>
            <Box sx={{ mx: 2, mt: 2 }}>
                {props.comment.comment}
            </Box>
            <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{ mx: 2, mb: 1 }}>
                <Typography variant={"caption"}>By: {props.comment.writer_name} | {dateCreated.toFormat("yyyy LLL dd")}</Typography>
                <IconButton size={"small"} onClick={() => {void handleOnClickDelete()}}><Delete fontSize={"small"} /></IconButton>
            </Grid>
        </Card>
    );
}

export {
    CommentCard,
}