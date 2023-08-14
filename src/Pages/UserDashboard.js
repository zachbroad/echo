import './UserDashboard.scss'
import Header from "../Components/Header";
import React from "react";
import {Container} from "react-bootstrap";
import {useAuth} from '../Components/Auth';
import UserDashboardView from "../Components/UserDashboardView";
import {useLoaderData} from "react-router";

export default function UserDashboard() {
  const {token, isLoggedIn, logout, myProfile} = useAuth();
  const {data, profile} = useLoaderData();

  const ViewWhenUnauth = () => (
    <div>
      <Container>
        <h3>
          You are not logged in
        </h3>
      </Container>
    </div>
  );

  return (
    <div>
      <Header/>
      {!isLoggedIn ? <ViewWhenUnauth/> : <UserDashboardView data={data}/>}
    </div>
  )
}