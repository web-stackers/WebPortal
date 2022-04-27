import { useLocation } from 'react-router-dom'
import dateFormat from 'dateformat'
import Typography from '@mui/material/Typography'
import StextField from '../../components/formComponents/StextField'
import StextArea from '../../components/formComponents/StextArea'
import Sbutton from '../../components/Sbutton'
import Job from '../../services/Job'
import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ResponseToComplaint = () => {
  const location = useLocation()
  const ID = location.state._id
  const whom = location.state.by
  const category = location.state.category
  const date = location.state.date
  const description = location.state.description

  const [reply, setReply] = useState({})

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setReply(values => ({ ...values, [name]: value }))
  }

  //It is given as onClick function in submit button to redirect to the main page
  const navigate = useNavigate()
  const routeChange = () => {
    let path = '/complaint'
    navigate(path)
  }

  //onClick function when submit button is clicked. Details will be update and path will be redirected
  const onSubmit = e => {
    e.preventDefault()
    console.log(reply)
    Job.updateThirdPartyByID(ID, reply)
    routeChange()
  }

  return (
    <div>
      <Typography variant='h4'>{whom}</Typography>
      <br />
      <form>
        <div>
          <StextField
            label='Date'
            name='date'
             value={reply.date || dateFormat(date, "yyyy-mm-dd")}
            onChange={handleChange}
          />

          <StextField
            label='By whom'
            name='byWhom'
            value={reply.whom || whom}
            onChange={handleChange}
          />

          <StextField
            label='Category'
            name='category'
            value={reply.category || category}
            onChange={handleChange}
          />

          <StextField
            label='Description'
            name='description'
            value={reply.description || description}
            onChange={handleChange}
          />
          <StextArea
            label='Admin Response'
            name='adminResponse'
            value={reply.adminResponse || ''}
            onChange={handleChange}
          />
        </div>
        <Sbutton
          text='Send'
          type='submit'
          onClick={onSubmit}
          btnWidth='15%'
          marginRight='5%'
        />
      </form>
    </div>
  )
}

export default ResponseToComplaint
