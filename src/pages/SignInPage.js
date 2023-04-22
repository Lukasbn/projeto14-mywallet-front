import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useContext, useState } from "react"
import { LoggedUser } from "../Context/LoggedUser"

export default function SignInPage() {

  const {token, setToken} = useContext(LoggedUser)

  const [email, setEmail] = useState("")
  const [password, setPassaword] = useState("")

  const navigate = useNavigate()

  function logar(e){
    e.preventDefault()
    
    const URL = "http://localhost:5000/"
    const body = { password, email }

    const promisse = axios.post(URL, body)

    promisse.then((res) => {
      setToken(res.data)
      localStorage.setItem('token', res.data)
      navigate("/home")
    })
    promisse.catch((err)=>{
      alert(err.response.data)
    })
  }

  console.log(token)

  return (
    <SingInContainer>
      <form onSubmit={logar}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required
        />
        <input
         placeholder="Senha"
         type="password"
         autoComplete="new-password"
         value={password}
         onChange={(e)=> setPassaword(e.target.value)}
         required
        />
        <button>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
