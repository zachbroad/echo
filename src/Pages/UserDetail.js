import React from "react";
import {useLoaderData} from "react-router";
import Layout from "../Components/Layout/Layout";
import UserDashboardView from "../Components/UserDashboard/UserDashboardView";

export default function UserDetail() {
  const [userData, error] = useLoaderData();

  return (
    <UserDashboardView data={userData}/>
  )
}