import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';
import { useState } from "react";

const schema = yup.object({
    email: yup.string().email('O e-mail não é válido').required('Campo obrigatório'),
    senha: yup.string().min(6, 'Deve conter no mínimo 6 caracteres').required('Campo obrigatório'),
  }).required();

const Login = () => {
    const [error, setError] = useState();
    const navigate = useNavigate()

    const handleClickSignUp = () => {
        navigate('/signup')
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'OnChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            } else {
                setError('Usuário não encontrado !');
            }
        }catch(e){
            setError('Usuário não encontrado !');
        }
    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            
            <Column>
                <Wrapper>
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} errorMessage={errors?.email?.message}/>
                        <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} errorMessage={errors?.senha?.message}/>
                        <Button title="Entrar" variant="secondary" type="submit"/>
                    </form>

                    <Row>
                        {error && <span className="errorMessage">{error}</span>}
                    </Row>

                    <Row>
                        <EsqueciText>Esqueci minha senha</EsqueciText>
                        <a onClick={handleClickSignUp}><CriarText>Criar Conta</CriarText></a>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }