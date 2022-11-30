import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { tasks } from "../utils/utils";
import { useParams } from "react-router-dom";

//APIs
import FetchProjectMembersAPI from "../redux/actions/api/Project/FetchProjectMembers";
import FetchLanguageAPI from "../redux/actions/api/Project/FetchLanguages";
import APITransport from "../redux/actions/apitransport/apitransport";
import { useDispatch, useSelector } from "react-redux";
import ProjectStyle from "../styles/ProjectStyle";
import moment from "moment";

const CreateTaskDialog = ({
  open,
  handleUserDialogClose,
  createTaskHandler,
}) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const classes = ProjectStyle();

  const projectMembers = useSelector((state) => state.getProjectMembers.data);
  const languages = useSelector((state) => state.getLanguages.data.language);

  const [taskType, setTaskType] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [language, setLanguage] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(moment().format());

  useEffect(() => {
    const obj = new FetchProjectMembersAPI(projectId);
    dispatch(APITransport(obj));

    const apiObj = new FetchLanguageAPI();
    dispatch(APITransport(apiObj));
  }, []);

  const submitHandler = () => {
    const obj = {
      task_type: taskType,
      user_id: user.id,
    };
    createTaskHandler(obj);
  };

  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={handleUserDialogClose}
      close
      maxWidth={"md"}
    >
      <DialogTitle variant="h4">Create New Task</DialogTitle>
      <DialogContent style={{ paddingTop: 4 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box width={"100%"} sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="select-role">Select Role</InputLabel>
              <Select
                labelId="select-role"
                label="Select Role"
                fullWidth
                value={taskType}
                onChange={(event) => setTaskType(event.target.value)}
                style={{ zIndex: "0" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                {tasks.map((item, index) => (
                  <MenuItem key={index} value={item.type}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box width={"100%"} sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="assign-user">Assign User</InputLabel>
              <Select
                labelId="assign-user"
                label="Assign User"
                fullWidth
                value={user}
                onChange={(event) => setUser(event.target.value)}
                style={{ zIndex: "0" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                {projectMembers.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box width={"100%"} sx={{ mt: 3 }}>
            <TextField
              label={"Description"}
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Box>

          {(taskType === "TRANSLATION_SELECT_SOURCE" ||
            taskType === "TRANSLATION_EDIT" ||
            taskType === "TRANSLATION_REVIEW") && (
            <Box width={"100%"} sx={{ mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="select-lang">Select Language</InputLabel>
                <Typography gutterBottom component="div" label="Required">
                  Select Language:
                </Typography>
                <Select
                  fullWidth
                  labelId="select-lang"
                  label="Select Language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  style={{ zIndex: "0" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {languages?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Box width={"100%"} sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="select-priority">Select Priority</InputLabel>
              <Select
                fullWidth
                labelId="select-priority"
                label="Select Priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                style={{ zIndex: "0" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem key={1} value="p1">
                  P1
                </MenuItem>
                <MenuItem key={2} value="p2">
                  P2
                </MenuItem>
                <MenuItem key={3} value="p3">
                  P3
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box width={"100%"} sx={{ mt: 3 }}>
            <DatePicker
            label="ETA"
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
              className={classes.datePicker}
            />
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions style={{ padding: "24px 24px 24px 0" }}>
        <Button autoFocus onClick={handleUserDialogClose}>
          Close
        </Button>
        <Button
          autoFocus
          variant="contained"
          sx={{ borderRadius: 2 }}
          onClick={() => submitHandler()}
        >
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskDialog;
