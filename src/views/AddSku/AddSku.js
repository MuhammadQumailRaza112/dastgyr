import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import UserModel from 'models/UserModel';
import clsx from 'clsx';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const AddSku = (props) => {
  const classes = useStyles();
  const { className, ...rest } = props;

  const [params, setParams] = useState({
    name: 'Shen',
    code:'',
    cat:'',
    subcat:'',
    prod:'',
    city:'',
    image:'',
  });

  const handleChange = event => {
    setParams({
      ...params,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
//     UserModel.getInstance().AddSku(params, (succ) => {console.log(succ)}, (err) => {console.log(err)});
//   console.log(params)
  }

  return (
    <div className={classes.root}>
        <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          title="Add Product"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Specify Sku name"
                label="Sku name"
                margin="dense"
                name="sku"
                onChange={handleChange}
                required
                value={params.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="cat"
                margin="dense"
                name="Category"
                onChange={handleChange}
                required
                value={params.cat}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="subcat"
                margin="dense"
                name="Subcat"
                onChange={handleChange}
                required
                value={params.subcat}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Product"
                margin="dense"
                name="prod"
                onChange={handleChange}
                required
                value={params.prod}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="image"
                margin="dense"
                name="Image"
                onChange={handleChange}
                required
                value={params.image}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Add Product
          </Button>
        </CardActions>
      </form>
    </Card    >
    </div>
  );
};

export default AddSku;
