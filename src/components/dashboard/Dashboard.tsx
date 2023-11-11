import React, {SyntheticEvent, useContext, useState} from 'react';
import {Btn} from "../common/Btn";
import {AuthContext} from "../../contexts/auth.context";
import {UserContext} from "../../contexts/user.context";





export const Dashboard = () => {
    const{userName, setUserName} = useContext(UserContext)



    return (
      <h1>Witaj {userName}</h1>
    )
}