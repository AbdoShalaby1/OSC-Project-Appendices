import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages"
import Makes from "./Pages/makes"
import Navbar from "./Components/nav"
// import AddListingUser from "./Pages/addListingsUser"
import AddListingAdmin from "./Pages/addListingAdmin"
import AllCars from "./Pages/allCars"


function App() {
  return (
  <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/makes" element={<Makes />} />
        <Route path="/add-listing" element={<AddListingAdmin />} />
        <Route path="/all-cars" element={<AllCars />} />
        { /* <Route path="/login" element={<Login />} />
        <Route path="/car/:id" element={<CarDetail />} /> */}
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
