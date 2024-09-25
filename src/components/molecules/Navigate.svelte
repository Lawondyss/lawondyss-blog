<script lang="ts">
  import config from '$config'
  import NavLink from '$atoms/NavLink.svelte'
</script>

<nav>
  <NavLink check={config.routes.blog} label="Blog" url={`${config.routes.blog}/1`}/>
  <NavLink label="O mně" url={config.routes.about}/>
  <NavLink label="Kontakt" url={config.routes.contact}/>
</nav>

<style>
  nav {
    display: flex;
    flex-wrap: nowrap;
    gap: .45rem;
  }
</style>
