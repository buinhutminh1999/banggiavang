import { useEffect, useState } from 'react';
import HomeComponent from './Component/HomeComponent';
import Loading from './Component/Loading';
function App() {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 3000)
  }, [])
  return (
<HomeComponent />
    // <div>
    //   {loading ? <Loading/> : <HomeComponent />}
    // </div>


  )
}

export default App;
