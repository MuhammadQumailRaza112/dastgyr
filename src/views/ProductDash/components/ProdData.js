import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// import moment from 'moment';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import mockData from './data';
// import { StatusBullet } from 'components';
// import createPalette from '@material-ui/core/styles/createPalette';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useHistory } from "react-router-dom";
import PropTypes, { func } from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import MaterialTable from 'material-table';

import UserModel from 'models/UserModel';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const ProdData = props => {

  var [prodData, setProdData] = useState([]);
  const [state, setState] = React.useState([
    {title: 'Prod Id', field: 'prodId', editable: 'never'},
    {title: 'Product Name', field: 'prodName'},
    {title: 'Brand', field: 'brand'},
    {title: 'Category', field: 'cat', editable: 'never'},
    {title: 'Subcategory', field: 'subcat', editable: 'never'}
  ]);

  useEffect(() => {
    UserModel.getInstance().getProduct(null,async (data) => {
      // console.log(data);
      let tempArr = [];
      
      await data.forEach((obj) => {
        tempArr.push({
          prodId: obj.id,
          prodName: obj.name,
          brand: obj.brand_name,
          // cat: obj.categories[0].name,
          // subcat: obj.subcategories[0].name
        })
      });
      // console.log(prodData)
      setProdData(tempArr)

    }, (err) => {
      console.log(err)
    })
  },[])

  const { className, ...rest } = props;
  let history = useHistory();

  const classes = useStyles();
  console.log(prodData)

  // const [data] = useState(mockData);
  
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Nunito Sans, Roboto, sans-serif"
    }
  });

  return (
    <MuiThemeProvider theme={theme} >
    <MaterialTable
    title = "Products"
      columns={state}
      data={prodData}
      className={clsx(classes.root, className)}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: () => {history.push('/add-prod')}
        }
      ]}
      editable={{
        // onRowAdd: (newData) =>
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       setState((prevState) => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              console.log(oldData);
              UserModel.getInstance().removeProduct(oldData.prodId, 
                (resData) => {
                  console.log(resData)
                  window.location.reload()
                },
                (err) => {console.log(err)})
              // setProdData((prevState) => {
              //   prodData.splice(prodData.indexOf(oldData), 1);
              //   return [...prevState, prodData];
              // });
            }, 600);
          }),
      }}
      >

    </MaterialTable>
    </MuiThemeProvider>
  );
};

ProdData.propTypes = {
  className: PropTypes.string
};

export default ProdData;
