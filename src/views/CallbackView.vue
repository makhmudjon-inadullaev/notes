<template>
    <div class="div h-[100vh] box-border grid place-items-center">
        <LottieAnimation id="lottie-animation" :animationData="lottieNotes" :height="400" :width="400"/>
    </div>
</template>
<script setup lang="ts">
import lottieNotes from '../assets/lottie-notes.json'
</script>