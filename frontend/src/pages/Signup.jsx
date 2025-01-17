import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/authContext';
import { useDarkThemeContext } from '../context/DarkTheme';
import Slider from '../components/Slider';
// import eventsLogo from '../assets/events.png'

const Signup = () => {

  const [colleges, setcolleges] = useState([]);
  const { isDark, setDark } = useDarkThemeContext()
  const { authUser, setauthUser } = useAuthContext()
  useEffect(() => {
    setDark("false")
    const getCollleges = async () => {
      const res = await fetch('https://unispherebackend.onrender.com/api/admin/getClg')
      const data = await res.json()
      setcolleges(data.colleges)
      console.log(data.colleges);
    }
    getCollleges()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value
    const college = e.target[2].value
    const res = await fetch('https://unispherebackend.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        college
      })
    })
    const data = await res.json()
    if (data.error) {
      alert(data.error)

    } else {

      alert(data.message)
      setauthUser(data.user)
      console.log(authUser);
      localStorage.setItem("mbAuth", JSON.stringify(data.user))
      localStorage.setItem("mbTheme", "false")
      window.location.href = "/"
    }
    console.log(data);
  }


  return (
    <>
      <Slider />
      <div className="login">
        <h1 className=''  >join<span className='Name'  >uniSphere</span></h1>
        <form onSubmit={handleSubmit} className='loginForm  w-full px-3 ' >

          <div className="inputContainer2">
            <label htmlFor="user_name" className='text-white' >what we can call you ?</label>
            <input type="text" id='user_name' name='username' placeholder='Enter the username' />
          </div>
          <div className="inputContainer2">
            <label htmlFor="pass_word" className='text-white'  >Password (keep it short)</label>
            <input type="text" id='pass_word' name='password' placeholder='Enter the password' />
          </div>
          <div className="inputContainer2">
            <label htmlFor="college_name" className='text-white'  >Select college👇</label>
            <select className='selectCollege' id='college_name' name="college" >
              {
                colleges.map((clg) => <option className='bg-black' key={clg._id} value={clg._id}>{clg.name}</option>)
              }
            </select>
          </div>
          <button type='submit' className='loginBtn'   >join</button>
          <a href="/login" className="text-white underline"   >Already have an account ?</a>
        </form>
      </div>
    </>

  )
}

export default Signup
