import { useState } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { CREATE_USER } from "../utils/mutations";
import { createUser } from "../utils/API";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";

pillForm = () => {
    const [userFormData, setUserFormData] = useState({
        name: "",
        quantity: "",
        dosage: "",
        category: "",
        frequency: ""
      });

}

export default pillForm