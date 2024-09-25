<script lang="ts">
  import {page} from '$app/stores'

  type Props = {
    url: string,
    label: string,
    check?: string | undefined,
  }

  let {
    url,
    label,
    check = url,
  }: Props = $props()

  let current = $state(false)

  page.subscribe(({route}) => {
    current = route.id?.includes(check) ?? false
  })
</script>

<a class:current href={url}>{label}</a>

<style>
  a {
    display: inline-block;
    padding-inline: .25rem;
    color: var(--text-darker);
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-weight: 400;
    letter-spacing: -1px;
    text-decoration: none;
    white-space: nowrap;
    transition: color var(--transition);
  }

  a:hover,
  a.current {
    color: var(--text);
  }
</style>
