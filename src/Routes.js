import React,{useEffect,useState} from 'react';
import { Switch, Redirect,Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import UserModel from './models/UserModel';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  SkuDash,
  ProductDash,
  BrandDash,
  SubcatDash,
  CategoryDash,
  CityDash,
  AddProduct,
} from './views';

const Routes = () => {
//  const [isAuth,setisAuth] = useState(false) 
//   useEffect(() => {
//     console.log('comp did mount');
//     const isAuths = UserModel.getInstance().isAuth()
//     console.log('is auth',isAuths)
//     setisAuth(isAuths);  
//     console.log('aftrer set ',isAuth)
      
//   },[isAuth])

  return ( 
    <Switch>
     
    {/* <Route
     exact
     path="/"
     render={() =>{
       return(
         isAuth ? <Redirect
         exact
         from="/"
         to='/dashboard'
       /> :  <Redirect
       exact
       from="/"
       to='/sign-in'
     />
       )
     }}
    /> */}
     <Redirect
         exact
         from="/"
         to='/dashboard'
         />
  
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/prods"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
        <RouteWithLayout
          component={SkuDash}
          exact
          layout={MainLayout}
          path="/skus"
        />
        <RouteWithLayout
          component={ProductDash}
          exact
          layout={MainLayout}
          path="/products"
        />
        <RouteWithLayout
          component={AddProduct}
          exact
          layout={MainLayout}
          path="/add-prod"
        />
        <RouteWithLayout
          component={BrandDash}
          exact
          layout={MainLayout}
          path="/brands"
        />
        <RouteWithLayout
          component={SubcatDash}
          exact
          layout={MainLayout}
          path="/subcategories"
        />
        <RouteWithLayout
          component={CategoryDash}
          exact
          layout={MainLayout}
          path="/categories"
        />
        <RouteWithLayout
          component={CityDash}
          exact
          layout={MainLayout}
          path="/cities"
        />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
