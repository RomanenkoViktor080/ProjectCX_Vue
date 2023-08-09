import React, {useEffect, useState} from 'react';
import classes from "./ProfilePageComponent.module.scss";
import {Route, Routes, useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import ProfileSettingsComponent from "../components/Content/Profile/ProfileSettingsComponent";
import ProfileDesktopHomeComponent from "../components/Content/Profile/ProfileDesktopHomeComponent";
import useSignOut from "../hooks/AuthHooks/useSignOut";

const ProfilePageComponent = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();
    const [profileState, setProfileState] = useState(false);
    const [profileClasses, setProfileClasses] = useState({
        menuProfile: [classes.profileMenu],
        contentProfile: [classes.content, classes.hiddenOnMobile]
    });

    useEffect(() => {
        if (profileState === true) {
            setProfileClasses({
                menuProfile: [profileClasses.menuProfile.filter((item) => item !== classes.hiddenOnMobile), classes.hiddenOnMobile],
                contentProfile: profileClasses.contentProfile.filter((item) => item !== classes.hiddenOnMobile)
            })
        } else {
            setProfileClasses({
                menuProfile: profileClasses.menuProfile.filter((item) => item !== classes.hiddenOnMobile),
                contentProfile: [...profileClasses.contentProfile, classes.hiddenOnMobile]
            })

        }
    }, [profileState]);


    return (
        <div className={classes.profile}>
            <div className={profileClasses.menuProfile.join(" ")}>
                <div className={classes.profileImage}>
                    <img
                        src="https://avatars.mds.yandex.net/i?id=fcd934fb3fd86beedd13a150df698436402c5590-5113868-images-thumbs&n=13"
                        alt=""/>
                </div>
                <div className={classes.menuBlock}>
                    <div className={classes.menuBlockTitle}>
                        Профиль
                    </div>
                    <div className={classes.blockMenuList}>
                        <NavLink to={"/profile"}
                                 className={({isActive}) => [classes.link, classes.menuItem, classes.hiddenOnMobile, isActive ? classes.active : null].filter(Boolean).join(" ")}
                                 end><span
                            className={classes.text}>Главная</span></NavLink>
                        <NavLink to={"settings"}
                                 className={({isActive}) => [classes.link, classes.menuItem, isActive ? classes.active : null].filter(Boolean).join(" ")}><span
                            className={classes.text}>Настройки профиля</span></NavLink>
                        <NavLink to={"/cart"}
                                 className={({isActive}) => [classes.link, classes.menuItem, isActive ? classes.active : null].filter(Boolean).join(" ")}><span
                            className={classes.text}>Корзина</span></NavLink>
                        <div className={classes.menuItem} onClick={() => signOut()}>
                            <span className={classes.text}>Выйти из аккаунта</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className={profileClasses.contentProfile.join(" ")}>
                {
                    profileState && <div className={classes.showOnMobile} onClick={() => navigate(-1)}>
                        Назад
                    </div>
                }
                <Routes>
                    <Route path="settings"
                           element={<ProfileSettingsComponent setProfileState={setProfileState}/>}/>
                    <Route path=""
                           element={<ProfileDesktopHomeComponent/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default ProfilePageComponent;
