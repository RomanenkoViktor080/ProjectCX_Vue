import React, {useEffect} from 'react';

const ProfileWrapperComponent = ({children, setProfileState}) => {
    useEffect(() => {
        setProfileState(true);
        return () => setProfileState(false);
    }, [])
    return (
        <>
            {children}
        </>
    );
};

export default ProfileWrapperComponent;
