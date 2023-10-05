<img src="/me.jpg" alt="Láďa Vondráček" />
<slot />

<style>
    img {
        display: block;
        width: max(20%, 120px);
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid var(--color-darker);
        margin: 0 auto 2rem auto;
    }

    @media screen and (min-width: 600px) {
        img {
            float: left;
            margin: 0 2rem 1rem 0;
        }
    }
</style>
