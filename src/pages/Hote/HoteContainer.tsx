import React, {createContext} from 'react';
import {createBrowserRouter, Outlet, RouterProvider, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import Hote_Tables from "./Hote_Tables";

export const InscriptionContext = createContext(null) ;
function HoteContainer() {


  // const [count, setCount] = useState(0) ;
  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.5
  };

  const PageLayout = ({ children }) => children;

  const AnimationLayout = () => {
    const { pathname } = useLocation();
    return (
        <PageLayout>
          <motion.div
              key={pathname}
              initial="initial"
              animate="in"
              variants={pageVariants}
              transition={pageTransition}
          >
            <Outlet />
          </motion.div>
        </PageLayout>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AnimationLayout />,
      children: [
        {path: "/", element: <Hote_Tables/>},
        {path: "/*", element: <Hote_Tables/>},
      ]
    }
  ]);

  return (
      <div id="preparation-container">
      <InscriptionContext.Provider value={null}>
        <RouterProvider router={router} />
      </InscriptionContext.Provider>
      </div>
  )
}

export default HoteContainer
