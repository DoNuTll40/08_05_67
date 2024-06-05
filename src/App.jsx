import LoadingPages from "./components/LoadingPages";
import { PersonContextProvider } from "./contexts/PersonContext"
import UseAuth from "./hooks/UseAuth"
import AppRoute from "./routes/AppRoute"

function App() {

  const { loading } = UseAuth();

  if(loading){
    return <LoadingPages />
  }

  return (
    <>
      <AppRoute />
    </>
  )
}

export default App
