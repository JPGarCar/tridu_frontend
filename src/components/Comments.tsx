import { Box, Card, IconButton, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { Delete } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnackbarServiceContext } from "../context/SnackbarContext.tsx";

function CommentCard(props: {
  comment: {
    creation_date: string;
    id?: number | null | undefined;
    writer_name?: string | undefined;
    comment: string;
  };
  deleteCommentApiCall: (commentId: number) => Promise<void>;
  onCommentDelete: () => void;
}) {
  const dateCreated = DateTime.fromISO(props.comment.creation_date);

  const { pushAlert } = useSnackbarServiceContext();

  const handleOnClickDelete = async () => {
    if (props.comment.id) {
      await props.deleteCommentApiCall(props.comment.id);

      pushAlert("Comment deleted.", "success");
      props.onCommentDelete();
    }
  };

  return (
    <Card key={props.comment.id}>
      <Box sx={{ mx: 2, mt: 2 }}>{props.comment.comment}</Box>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mx: 2, mb: 1 }}
      >
        <Typography variant={"caption"}>
          By: {props.comment.writer_name} |{" "}
          {dateCreated.toFormat("yyyy LLL dd")}
        </Typography>
        <IconButton
          size={"small"}
          onClick={() => {
            void handleOnClickDelete();
          }}
        >
          <Delete fontSize={"small"} />
        </IconButton>
      </Grid>
    </Card>
  );
}

export { CommentCard };
