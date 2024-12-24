import {api} from "../api"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const sendContactForm = async (data: {
    username: string;
    gmail: string;
    comment: string;
  }) => {
    const response = await api.post("/contacts/", data);
    return response.data;
  };
  
