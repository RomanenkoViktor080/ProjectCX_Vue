import React, {useState} from 'react';
import classes from "./ProfileSettingsComponent.module.scss";
import ProfileWrapperComponent from "./ProfileWrapperComponent";
import ButtonComponent from "../../UI/Buttons/ButtonComponent";
import InputTextFormComponent from "../../UI/Inputs/InputTextFormComponent";

const ProfileSettingsComponent = ({setProfileState}) => {
    const [formOpened, setFormOpened] = useState({publicData: false, accountsData: false});

    return (
        <ProfileWrapperComponent setProfileState={setProfileState}>
            <div className={classes.profileSettings}>
                <div className={classes.settingsBlock}>
                    <div className={classes.settingsBlockTitle}>
                        Публичные данные
                    </div>
                    <div className={classes.settingsBlockDescription}>
                        Информация, которую вы укажете в этом разделе, публичная. Она указывается рядом с отзывами и
                        видна другим пользователям сети Интернет. Размещая свои персональные данные в данном разделе, вы
                        раскрываете их неопределенному кругу лиц.
                    </div>
                    <div className={classes.settingsBlockBody}>
                        {
                            formOpened.publicData ? <><InputTextFormComponent placeholderText={"+7 990 984 57 34"}
                                                                              inputPropClass={classes.formInput}/>
                                    <InputTextFormComponent placeholderText={"example@gmail.com"}
                                                            inputPropClass={classes.formInput}/></> :
                                <>
                                    <div>Телефон: +7 990 984 57 34</div>
                                    <div>Почта: example@gmail.com</div>
                                </>
                        }

                        <div className={classes.formActions}>
                            {formOpened.publicData ? <><ButtonComponent classWrapper={classes.formActionsButton}
                                                                        onClick={() => setFormOpened({
                                                                            ...formOpened,
                                                                            publicData: false
                                                                        })}>Отменить</ButtonComponent>
                                    <ButtonComponent
                                        classWrapper={classes.formActionsButton}>Сохранить</ButtonComponent></> :
                                <ButtonComponent classWrapper={classes.formActionsButton}
                                                 onClick={() => setFormOpened({
                                                     ...formOpened,
                                                     publicData: true
                                                 })}>Изменить</ButtonComponent>}
                        </div>
                    </div>
                </div>

                <div className={classes.settingsBlock}>
                    <div className={classes.settingsBlockTitle}>
                        Учётные данные
                    </div>
                    <div className={classes.settingsBlockDescription}>
                        Настройка данных учетной записи
                    </div>
                    <div className={classes.settingsBlockBody}>
                        {
                            formOpened.accountsData ? <><InputTextFormComponent placeholderText={"Олег"}
                                                                                inputPropClass={classes.formInput}/>
                                    <InputTextFormComponent placeholderText={"Романенко"}
                                                            inputPropClass={classes.formInput}/></> :
                                <>
                                    <div>Имя: Олег</div>
                                    <div>Фамилия: Романенко</div>
                                </>
                        }

                        <div className={classes.formActions}>
                            {formOpened.accountsData ? <><ButtonComponent classWrapper={classes.formActionsButton}
                                                                          onClick={() => setFormOpened({
                                                                              ...formOpened,
                                                                              accountsData: false
                                                                          })}>Отменить</ButtonComponent>
                                    <ButtonComponent
                                        classWrapper={classes.formActionsButton}>Сохранить</ButtonComponent></> :
                                <ButtonComponent classWrapper={classes.formActionsButton}
                                                 onClick={() => setFormOpened({
                                                     ...formOpened,
                                                     accountsData: true
                                                 })}>Изменить</ButtonComponent>}
                        </div>
                    </div>
                </div>
            </div>
        </ProfileWrapperComponent>
    );
};

export default ProfileSettingsComponent;
