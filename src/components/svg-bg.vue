<template>
    <div class="row">
        <div class="col-md-9">
            <div class="custom-shape-divider-bottom-1632178739">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" class="shape-fill"></path>
            </svg>
        </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .custom-shape-divider-bottom-1632178739 {
    // position: absolute;
    // bottom: 0;
    // left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    .shape-fill {
        fill: #ffffff7d;
    }
    svg {
        // position: relative;
        background: darkblue;
        display: block;
        width: calc(300% + 1.3px);
        height: 40vh;
        @media (max-width: 767px) {
            width: calc(500% + 1.3px);
            height: 30vh;
        }
    }
}
</style>