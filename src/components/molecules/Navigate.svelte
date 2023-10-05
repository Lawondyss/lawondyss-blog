<script lang="ts">
    import config from '$config'
    import NavLink from '$atoms/NavLink.svelte'
</script>

<nav>
    <NavLink url={`${config.routes.blog}/1`} label="Blog" check={config.routes.blog} />
    <NavLink url={config.routes.about} label="O mně" />
    <NavLink url={config.routes.contact} label="Kontakt" />
</nav>

<style>
    nav {
        display: flex;
        flex-wrap: nowrap;
        gap: .45rem;
    }
</style>
