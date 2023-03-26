import {
  FC,
  useEffect,
  useState,
  useContext,
  useRef,
  SyntheticEvent,
} from 'react';
import { localeContext } from '../../../context/locale-context';
import { FormPropsInterface } from '../../../config/interfaces/app.interfaces';
import Form from '../../form/form.component';
import styles from './login.module.css';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';
import { authContext } from '../../../context/admin/auth.context';

const Login: FC = () => {
  const [localeKey, setLocaleKey] = useState('');
  const LocalCntextObject: any = useContext(localeContext);
  const [dictionary, setDictionary] = useState(null);
  const [needLoader, setNeedLoader] = useState(false);
  const needRedairect = useRef(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const isVeriyfied = useRef(false);
  const authContextObject: any = useContext(authContext);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (!isVeriyfied.current) {
        isVeriyfied.current = true;
        setLocaleKey(LocalCntextObject.localeKey);
        setDictionary(LocalCntextObject.dictionary);
        if (localStorage.getItem('_token')) {
          await fetch('/api/admin/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: AES.decrypt(
                localStorage.getItem('_token'),
                'secretPassphrase'
              ).toString(enc.Utf8),
            }),
          })
            .then(async (res) => await res.json())
            .then(async (data) => {
              if ((await data) && (await data.isValid)) {
                authContextObject.setUser(data.user);
                const token = AES.encrypt(
                  data.user.token,
                  'secretPassphrase'
                ).toString();
                localStorage.setItem('_token', token);
                needRedairect.current = true;
                setShowSpinner(false);
              } else if ((await data) && !(await data.isValid)) {
                router.push('/admin/login');
                setShowSpinner(false);
              } else {
                throw new Error('Something went wrong');
              }
            })
            .catch((err) => {
              throw err;
            })
            .finally(() => {
              setShowSpinner(false);
            });
        } else {
          setShowSpinner(false);
        }
      }
    })();
  }, [LocalCntextObject, authContextObject, showSpinner, router]);
  if (needRedairect.current) {
    router.push('/admin/dashboard');
  } else {
    const requestBody = {
      email: '',
      password: '',
    };
    /**
     * @description this is login function
     * @param {Event} e
     */
    const loginHendler = async (e: SyntheticEvent) => {
      e.preventDefault();
      let params: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept-control-allow-origin': '*', // for cors
        },
        body: JSON.stringify(requestBody),
      };
      setNeedLoader(true);
      await fetch('/api/admin/login', params)
        .then((res) => res.json())
        .then((data) => {
          setNeedLoader(false);
          if (data.user && data.user.token && data.user.token !== '') {
            const token = AES.encrypt(data.user.token, 'secretPassphrase');
            localStorage.setItem('_token', token.toString());
            authContextObject.setUser(data.user);
            router.push('/admin/dashboard');
          } else if (data && data.message === 'Invalid Password') {
            setLoginError(data.message);
          } else if (
            data &&
            data.message === 'Invalid Email, or user not exit'
          ) {
            setLoginError(data.message);
          } else {
            setLoginError('Something went wrong');
            console.log('something went wrong');
          }
        });
    };

    const getvalues = async (e: any) => {
      e.preventDefault();
      console.log(e.currentTarget.value);
      if (e.currentTarget.name === 'email') {
        requestBody.email = e.currentTarget.value;
        console.log(requestBody.email);
      }
      if (e.currentTarget.name === 'password') {
        requestBody.password = e.currentTarget.value;
        console.log(requestBody.password);
      }
    };

    const formInputs = [
      {
        id: Math.random().toString(),
        type: 'Email',
        name: 'email',
        className: 'form-input',
        placeholder: dictionary ? dictionary[localeKey]['email'] : 'ელ.ფოსტა',
        needCommonParent: false,
        eventType: 'onChange',
        eventHandler: getvalues,
      },
      {
        id: Math.random().toString(),
        type: 'password',
        name: 'password',
        className: 'form-input',
        placeholder: dictionary ? dictionary[localeKey]['password'] : 'პაროლი',
        needCommonParent: false,
        eventType: 'onChange',
        eventHandler: getvalues,
      },
    ];
    const FomrProps: FormPropsInterface = {
      formClassName: 'form',
      inputs: formInputs,
      inputsCommonParentClass: 'inputs_common_parent',
      needTextareas: false,
      needButton: true,
      buttonClass: 'form_button',
      buttonText: LocalCntextObject.dictionary
        ? LocalCntextObject.dictionary[LocalCntextObject.localeKey]['login']
        : 'შესვლა',
      ButtoncallBack: loginHendler,
    };

    if (showSpinner) {
      return (
        <div className={styles.login_spiner_conteiner}>
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={showSpinner}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      );
    } else {
      return (
        <>
          <div className={styles.conteiner}>
            <div className={styles.form_conteiner}>
              <h1 className={styles.login_form_title}>შესვლა</h1>
              <Form
                FormProps={FomrProps}
                Loader={needLoader}
                loadrConteinerClassname={'form_loader_conteiner'}
              />
              <p className={styles.login_error}>{loginError}</p>
            </div>
          </div>
        </>
      );
    }
  }
};

export default Login;
