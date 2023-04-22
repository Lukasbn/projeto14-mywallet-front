import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"

export default function SignUpPage() {
  
  const [email, setEmail] = useState("")
  const [password, setPassaword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassord] = useState("")

  const navigate = useNavigate()

  function registrar(e){
    e.preventDefault()

    if(password !== confirmPassword){
      return alert("A senha e a confirmação não são compativeis, confira e tente novamente")
    }

    const URL = "http://localhost:5000/cadastro"
    const body = {name, password, email}

    const promisse = axios.post(URL, body)

    promisse.then(() => navigate('/'))
    promisse.catch((err)=>{
      alert(err.response.data)
    })
  }

  return (
    <SingUpContainer>
      <form onSubmit={registrar} >
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          required
        />
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
          autocomplete="new-password"
          value={password}
          onChange={(e)=> setPassaword(e.target.value)}
          required
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autocomplete="new-password"
          value={confirmPassword}
          onChange={(e)=> setConfirmPassord(e.target.value)}
          required
        />
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
