import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import UserModel from 'models/UserModel';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
import { isObject } from 'validate.js';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const AddProduct = (props) => {
  var [catData, setCatData] = useState([]);
  var [nullArray, setNullArray] = useState([]);
  var [subcatData, setSubcatData] = useState([]);
  var [selectedCat, setSelectedCat] = useState('');
  var [selectedSubcat, setSelectedSubcat] = useState('');

  useEffect( () => {
    let tempArray = [];
    UserModel.getInstance().getCategory(null, 
      (data) => {
        data.forEach((obj) => {
          tempArray.push({name: obj.name, id:obj.id})
          console.log("calling")
        })
        setCatData(tempArray);
    },
      (err) => {
        console.log(err);
      }
      )
    },[]
  )

  const classes = useStyles();
  const { className, ...rest } = props;

  const [params, setParams] = useState({
    name: '',
    // code: 'test prod code',
    // cat: 1,
    // subcat: 2,
    brand:'',
    image: ""
  });

  const handleChange = event => {
    setParams({
      ...params,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    const errors = checkForBlanks();
    if(errors){
      alert('Fill all required fields')
    }
    else{
      var obj = {
        name: params.name,
        // code: "prodcode",
        image: params.image,
        // brand: [1],
        category: [selectedCat.id, selectedSubcat.id],
      }
      UserModel.getInstance().addProduct(obj, (succ) => {console.log(succ)}, (err) => {console.log(err)});
      console.log(obj)
  
      console.log("selectedCat is "+selectedCat.name)
    }
  }

  const catChangeHandle = (event) => {
    var arr = event.target.id.split("-")[2];
    if(arr){
      selectedCat = (catData[arr]);
      setSelectedCat(selectedCat)
      console.log(selectedCat)
      UserModel.getInstance().getSubCategory(selectedCat.id, 
        (data) => {
          data.forEach((obj) => {
            setSubcatData([
              ...nullArray,
              ...[
                {
                  id: obj.id,
                  name: obj.name
                }
              ]
            ])
          })
      },
      (err) => {
        console.log(err)
      }
      )
    }
  }

  const subcatHandleChange = async (event) => {
    var arr = event.target.id.split("-")[2];
    if(arr){
      selectedSubcat = subcatData[arr];
      setSelectedSubcat(selectedSubcat)
    }
  }

  const checkForBlanks = () => {
    if(params.name === '' || params.image === '' || selectedCat==='' || selectedSubcat===''){
      return true;
    }
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
                helperText="Specify product name"
                label="Product name"
                margin="dense"
                name="name"
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
                label="Brand"
                margin="dense"
                name="brand"
                onChange={handleChange}
                value={params.brand}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                id="catSelect"
                options={catData}
                getOptionLabel= {(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                onChange={catChangeHandle}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                id="subcatSelect"
                options={subcatData}
                getOptionLabel= {(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Subcategory" variant="outlined" />}
                onChange={subcatHandleChange}

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
                name="image"
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

export default AddProduct;
