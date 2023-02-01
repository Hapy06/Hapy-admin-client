import React, {createContext, useEffect, useState} from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation
} from "react-router-dom";
import { motion } from "framer-motion";
import Command01_Category from "./Command01_Category";
import Command02_SubCategory from "./Command02_SubCategory";
import Command03_Product from "./Command03_Product";
import Command04_ValidationProgress from "./Command04_ValidationProgress";
import Command05_Validated from "./Command05_Validated";

export const CommandContext = createContext(null) ;

function CommandContainer(child:any) {

  // const [institution, setInstitution] = useState<Institution>(testInstitution);

   useEffect(() => {
    window.scrollTo(0, 0);
    }, []);


  return (
      <CommandContext.Provider value={null}>
        {child}
      </CommandContext.Provider>
  )
}

export default CommandContainer
