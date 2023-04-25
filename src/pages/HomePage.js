import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function HomePage() {

  const [operations, setOperations] = useState([])
  const [name, setName] = useState("")
  const [total, setTotal] = useState("")

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {

    const URL = `${process.env.REACT_APP_API_URL}/home`
    const authorization = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const promisse = axios.get(URL, authorization)

    promisse.then((res) => {
      setOperations(res.data.transactions.reverse())
      setName(res.data.name)
      setTotal(res.data.total)
    })
    promisse.catch((err) => {
      console.log(err.response.data)
      if(err.response.status === 401){
        navigate('/')
      }
    })

  }, [])

  function desconect() {
    localStorage.removeItem('token')
    navigate("/")
  }

  if (operations.length === 0) {
    return (
      <HomeContainer>
        <Header>
          <h1>Olá, {name}</h1>
          <BiExit onClick={desconect} />
        </Header>

        <TransactionsContainer>
          <EmptyConteiner>
            <div>Não há registros de entrada ou saída</div>
          </EmptyConteiner>
        </TransactionsContainer>


        <ButtonsContainer>
          <Link to='/nova-transacao/entrada'>
            <button >
              <AiOutlinePlusCircle />
              <p>Nova <br /> entrada</p>
            </button>
          </Link>
          <Link to='/nova-transacao/saída'>
            <button>
              <AiOutlineMinusCircle />
              <p>Nova <br />saída</p>
            </button>
          </Link>
        </ButtonsContainer>

      </HomeContainer>
    )
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <BiExit onClick={desconect} />
      </Header>

      <TransactionsContainer>
        <ul>
          {operations.map((data) => (
            <ListItemContainer>
              <div>
                <span>{data.date}</span>
                <strong>{data.description}</strong>
              </div>
              <Value color={data.type}>{data.value}</Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={total >= 0 ? 'entrada' : 'saída'}>{(total.toString()).replace(".", ",")}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to='/nova-transacao/entrada'>
          <button >
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to='/nova-transacao/saída'>
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const EmptyConteiner = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color:#868686;
  text-align:center;
  display: flex;
  align-items: center;
  margin: auto;
  height: 100%;
  width: 180px;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  ul{
    overflow: scroll;
    height: 90%;
  }
  article {
    display: flex;
    justify-content: space-between; 
    height: 20px;  
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  a{
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
  }
  button {
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
  div:first-child{
    box-sizing: border-box;
    padding-right: 20px;
  }
`