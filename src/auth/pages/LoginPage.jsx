import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFields =  {
    loginEmail: '',
    loginPassword: ''
};
const registerFields =  {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
};

export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const {onInputChange: onLoginInputChange, loginEmail, loginPassword} = useForm(loginFields);
    const {onInputChange, registerName, registerEmail, registerPassword, registerPassword2 } = useForm(registerFields);

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword }  );

    };
     const registerSubmit = ( event ) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2){
            Swal.fire("Error en registro", 'Constraseñas no son iguales', 'error');
            return;
        };
        startRegister({ name:registerName, email: registerEmail, password:registerPassword });
    };

    useEffect(() => {
      if (errorMessage !== undefined) {
        Swal.fire('Error en la autenticacion', errorMessage, 'error');
      }

    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name= 'loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name= 'loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name= 'registerName'
                                value={ registerName }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name= 'registerEmail'
                                value={ registerEmail }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name= 'registerPassword'
                                value={ registerPassword }
                                onChange={ onInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name= 'registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}