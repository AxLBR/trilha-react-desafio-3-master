import React from 'react'
import logo from '../../assets/logo-dio.png';
import { useNavigate  } from "react-router-dom";
import { Button } from '../Button';
import { Container, Wrapper, BuscarInputContainer, Input, Row, Menu, MenuRight, UserPicture} from './styles';

const Header = ({autenticado}) => {
  const navigate = useNavigate();

  const handleClickSignIn = () => {
    navigate('/login')
}

const handleClickSignUp = () => {
  navigate('/signup')
}

  return (
    <Wrapper>
      <Container>
          <Row>
            <a href="/"><img src={logo} alt="Logo da dio"/></a>
            {autenticado ? (
              <>
               <BuscarInputContainer>
                <Input placeholder='Buscar...'/>
               </BuscarInputContainer>
                <Menu>Live Code</Menu>
                <Menu>Global</Menu>
              </>
            ) : null}
          </Row>
          <Row>
              {autenticado ? (
                <UserPicture src="https://avatars.githubusercontent.com/u/45184516?v=4"/>
              ) : (
              <>
                <Button title="Entrar" onClick={handleClickSignIn}/>
                <Button title="Cadastrar" onClick={handleClickSignUp}/>
              </>)}
          </Row>
      </Container>
    </Wrapper>
  )
}

export { Header }
