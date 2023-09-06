<template>
    <slot/>
</template>

<script setup>
import {onMounted, onUnmounted} from "vue";

const props = defineProps({
    setProfileState: {require: true}
})

onMounted(() => {
    props.setProfileState(true);
})
onUnmounted(() => {
    props.setProfileState(false)
})
</script>
<!--
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
-->
