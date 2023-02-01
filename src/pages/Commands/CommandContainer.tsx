import React, {createContext, useEffect} from 'react'

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
