import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "lib/routes";
function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router}> </RouterProvider>
      <div className="App"></div>
    </ChakraProvider>
  );
}

export default App;
