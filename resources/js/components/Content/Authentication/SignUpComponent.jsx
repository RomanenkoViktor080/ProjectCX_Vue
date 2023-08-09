import React, {useState} from 'react';
import classes from "./AuthentificationForm.module.scss";
import InputTextFormComponent from "../../UI/Inputs/InputTextFormComponent";
import InputPasswordFormComponent from "../../UI/Inputs/InputPasswordFormComponent";
import ButtonComponent from "../../UI/Buttons/ButtonComponent";
import CheckboxComponent from "../../UI/Checkboxes/CheckboxComponent";
import useSignUp from "../../../hooks/AuthHooks/useSignUp";

const SignUpComponent = () => {

    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        remember: false
    });
    const [errors, setErrors] = useState(null)

    const signUp = useSignUp(setErrors);

    return (
        <>
            <div className={classes.formRow}>
                <span className={classes.formRowTitle}>Введите email</span>
                <InputTextFormComponent value={signUpData?.email}
                                        onChange={(e) => setSignUpData({
                                            ...signUpData,
                                            email: e.target.value

                                        })} inputPropClass={classes.inputForm}/>
                {errors?.email && <div className={classes.errorField}>{errors.email[0]}</div>}
            </div>
            <div className={classes.formRow}>
                <span className={classes.formRowTitle}>Введите пароль</span>
                <InputPasswordFormComponent value={signUpData?.password}
                                            onChange={(e) => setSignUpData({
                                                ...signUpData,
                                                password: e.target.value

                                            })} inputPropClass={classes.inputForm}/>
                {errors?.password && <div className={classes.errorField}>{errors.password[0]}</div>}
            </div>
            <div className={classes.formRow}>
                <span className={classes.formRowTitle}>Повторите пароль</span>
                <InputPasswordFormComponent
                    value={signUpData?.password_confirmation}
                    onChange={(e) => setSignUpData({
                        ...signUpData,
                        password_confirmation: e.target.value

                    })} inputPropClass={classes.inputForm}/>
            </div>
            <div className={classes.formRow}>
                <CheckboxComponent title={"Запомнить меня"} id={"remember_me"}
                                   onChange={(e) => setSignUpData({...signUpData, remember: !signUpData.remember})
                                   }/>

            </div>
            <ButtonComponent onClick={() => signUp(signUpData)}
                             classWrapper={classes.buttonForm}>Регистрация</ButtonComponent>
        </>
    );
};

export default SignUpComponent;
