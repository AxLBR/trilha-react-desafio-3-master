import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdAccountCircle } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Container, Title, Column, TitleLogin, SubtitleLogin, SubText, CriarText, TermsText, Row, Wrapper } from './styles';

const schema = yup.object({
    user: yup.string().required('Campo obrigatório'),
    email: yup.string().email('O e-mail não é válido').required('Campo obrigatório'),
    senha: yup.string().min(6, 'Deve conter no mínimo 6 caracteres').required('Campo obrigatório'),
  }).required();

const Signup = () => {
    const navigate = useNavigate()

    const handleClickSignIn = () => {
        navigate('/login')
    }

    const { control, handleSubmit, formState: { errors  } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        let newData = {name: data.user, email: data.email, senha: data.senha};

        api.post('/users', newData)
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
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo" leftIcon={<MdAccountCircle />} name="user"  control={control} errorMessage={errors?.user?.message}/>
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} errorMessage={errors?.email?.message}/>
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} errorMessage={errors?.senha?.message}/>
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>

                <TermsText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</TermsText>

                <Row>
                    <SubText>Já tenho conta.</SubText>
                    <a onClick={handleClickSignIn}><CriarText>Fazer login</CriarText></a>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Signup }