import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage() {

  const [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')
  const { tipo } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  if (tipo !== 'entrada' && tipo !== 'saída') {
    navigate('/home')
  }

  function ValueValidation(number) {
    const valorV1 = number.replace(',', '.')
    const dotIndex = valorV1.indexOf('.')
    if (dotIndex === -1) {
      return Number(valorV1).toFixed(2)
    } else {
      return Number(valorV1.slice(0, dotIndex + 3)).toFixed(2)
    }
  }

  function saveChange(e) {
    e.preventDefault()

    const validatedValue = ValueValidation(valor)

    const URL = `${process.env.REACT_APP_API_URL}/nova-transacao/${tipo}`
    const body = { value: validatedValue, description: descricao }
    const authorization = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const promisse = axios.post(URL, body, authorization)

    promisse.then((res) => {
      navigate("/home")
    })
    promisse.catch((err) => {
      alert(err.response.data)
    })
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={saveChange}>
        <input
          placeholder="Valor"
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
