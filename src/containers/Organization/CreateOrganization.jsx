import {
    Card,
    Grid,
    ThemeProvider,
    Typography,
    InputAdornment,
    Box,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import OutlinedTextField from "../../common/OutlinedTextField";
  import DatasetStyle from "../../styles/Dataset";
  import MenuItems from "../../common/MenuItems";
  import Button from "../../common/Button";
  import CreateOrganizationAPI from "../../redux/actions/api/Organization/CreateOrganization"
  import APITransport from "../../redux/actions/apitransport/apitransport";
  import { useDispatch, useSelector } from "react-redux";
  

  const CreateOrganization = (props) => {
   
    const classes = DatasetStyle();
    const dispatch = useDispatch();

   const [title, setTitle] = useState("");
   const [ emailDomainName, setEmailDomainName] = useState("");
   const [ organizationowner, setOrganizationowner] = useState("");
   const [organization, setOrganization] = useState([]);




   const onSelectOrganizationowner = () => {
    setOrganizationowner();
  };

  const handleCreate = () =>{
    const createorg ={
        title:title,
        email_domain_name:emailDomainName,
       }

    const orgObj = new CreateOrganizationAPI(createorg);
    dispatch(APITransport(orgObj));
    setTitle("")
    setEmailDomainName("")
  }
  
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
        <Card className={classes.workspaceCard}>
        <Typography align="center" variant="h3"sx={{mb:4}} >
             Create Organization
            </Typography>
            <Box>
          <Typography gutterBottom component="div" label="Required">
            Title*:
          </Typography>
          <OutlinedTextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography gutterBottom component="div" label="Required">
          Email Domain Name*:
          </Typography>
          <OutlinedTextField
            fullWidth
             value={emailDomainName}
             onChange={(e) => setEmailDomainName(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography gutterBottom component="div" label="Required">
          Organization owner*:
          </Typography>
          <MenuItems
                     menuOptions={organization}
                    handleChange={onSelectOrganizationowner}
                     value={organizationowner}
                  />
        </Box>
        <Box sx={{ mt: 3}}>
        <Button
            style={{ margin: "0px 20px 0px 0px" ,width:"80px", }}
            label={"Create"}
            onClick={() => handleCreate()}
           
          />
        </Box>
         
      </Card>
      </Grid>
    )
  };
  
  export default CreateOrganization;
  
  