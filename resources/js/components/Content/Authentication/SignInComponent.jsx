import React, {useState} from 'react';
import classes from "./AuthentificationForm.module.scss";
import InputTextFormComponent from "../../UI/Inputs/InputTextFormComponent";
import InputPasswordFormComponent from "../../UI/Inputs/InputPasswordFormComponent";
import ButtonComponent from "../../UI/Buttons/ButtonComponent";
import CheckboxComponent from "../../UI/Checkboxes/CheckboxComponent";
import useSignIn from "../../../hooks/AuthHooks/useSignIn";

const SignInComponent = () => {

        const [signInData, setSignInData] = useState({email: "", password: "", remember: false});
        const [errors, setErrors] = useState(null);
        const signIn = useSignIn(setErrors);

    return (
            <>
                <div className={classes.formRow}>
                    <span className={classes.formRowTitle}>Введите email</span>
                    <InputTextFormComponent value={signInData?.email}
                                            onChange={(e) => setSignInData({
                                                ...signInData,
                                                email: e.target.value
                                            })} inputPropClass={classes.inputForm}/>
                    {
                        errors?.email && <div className={classes.errorField}>{errors.email[0]}</div>
                    }
                </div>
                <div className={classes.formRow}>
                    <span className={classes.formRowTitle}>Введите пароль</span>
                    <InputPasswordFormComponent value={signInData?.password}
                                                onChange={(e) => setSignInData({
                                                    ...signInData,
                                                    password: e.target.value
                                                })} inputPropClass={classes.inputForm}/>
                    {
                        errors?.password && <div className={classes.errorField}>{errors.password[0]}</div>
                    }
                </div>
                <div className={classes.formRow}>
                    <CheckboxComponent title="Запомнить меня" id="remember_me"
                                       onChange={(e) => setSignInData({...signInData, remember: !signInData.remember})
                                  }/>

                </div>
                <ButtonComponent onClick={() => signIn(signInData)}
                                 classWrapper={classes.buttonForm}>Войти</ButtonComponent>
            </>
        );
    }
;

export default SignInComponent;
