import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatasetStyle from '../styles/Dataset';

const Card = (props) => {

    let navigate = useNavigate();
    let { id } = useParams();

    // const onCardPress = () => {
    //     navigate('/projects/1');
    // }

    const classes = DatasetStyle();
    const { projectObj} = props
    return (
        <Link to={`/projects/${projectObj.id}`} style={{ textDecoration: "none" }}>
            <Grid
                elevation={2}
                className={props.classAssigned}
                sx={{
                    minHeight: 250,
                    cursor: "pointer",
                    borderRadius: 5,
                    p: 2
                }}
            >
                <Typography variant="body2" sx={{ background: "#FFD981", p: 1, borderRadius: 5, width : "fit-content"}}>{projectObj.project_mode}</Typography>
                <Typography
                    variant="h6"
                    sx={{ 
                            mt: 3, 
                            textAlign: "center", 
                            color: "secondary.contrastText", 
                            backgroundColor: "primary.contrastText", 
                            borderRadius: 3, 
                            pt: 1, 
                            pb: 1, 
                            minHeight : 64, 
                            alignItems : "center", 
                            display:"grid" 
                        }}
                >{projectObj.title}
                </Typography>
                <Grid
                    container
                    direction="row"
                    sx={{mt:1, mb:2}}
                    spacing={3}
                    columnSpacing={{xs: 10, sm: 10, md: 10}}
                >
                    <Grid
                        item
                    >
                        <Typography variant="lightText">Type</Typography>
                        <Typography variant="body2" sx={{ color: "primary.contrastText", mt : 0.5, fontWeight : "500" }}>{projectObj.project_type}</Typography>
                    </Grid>
                    <Grid
                        item
                    >
                        <Typography variant="lightText">Project ID</Typography>
                        <Typography variant="body2" sx={{ color: "primary.contrastText", mt : 0.5, fontWeight : "500" }}>{projectObj.id}</Typography>
                    </Grid>
                </Grid>
                
                {/* <Typography variant="lightText">Description</Typography>
                <Typography variant="body2" sx={{ color: "primary.contrastText" }}>{projectObj.description}</Typography> */}

                {/* <Typography variant="body2" sx={{ mt: 2, ml: 5, color: "primary.contrastText" }}>{projectObj.desc}</Typography> */}
                {/* <Divider sx={{ mt: 7 }} variant="inset" /> */}

            </Grid>
        </Link>
    )
}

export default Card;