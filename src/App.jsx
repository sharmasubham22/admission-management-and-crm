import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [institutions, setInstitutions] = useState([])

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/institutions")
        setInstitutions(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInstitutions()
  } ,[]) 

  return (
    <>
      <h1>Institutions</h1>
      <ul>
        {institutions.map(inst => (
          <li key={inst._id}>{inst.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
