---
title: Přichází zapisovatelné $derived
perex: Ve Svelte je $derived klíčovou runou umožňující vytvářet reaktivní odvozené hodnoty. Ačkoliv zásadně zjednodušuje vývoj, její read-only charakter znemožňuje ovlivňovat hodnotu přímo. To se mění verzí 5.25.
date: 2025-05-14
tags:
  - svelte
  - svelte5
  - derived
---

## Bindování `$derived`
Protože do hodnot odvozených runou `$derived` nelze zapisovat, nelze je ani bindovat. Lze to řešit pomocnou proměnnou
vytvořenou `$state` runou ze závislé hodnoty. V případě komplexnější komponenty tak počet proměnných narůstá a
čitelnost se snižuje. Nehledě na nutnost vymýšlet další a další jména, což je vážně děs.

```svelte
<script>
  /**
   * @type {{
   *   names: { first: string, last: string },
   *   saveNames: (first: string, last: string) => Promise<void>
   * }}
   */
  let {names, saveNames} = $props()

  let isSaving = $state(false)
  let fullName = $derived(`${names.first} ${names.last}`)
  let editableName = $state(fullName)
  let isChanged = $derived(editableName !== fullName)

  function handleSave() {
    isSaving = true
    let [first, last] = editableName.split(' ')
    saveNames(first, last)
      .finally(() => isSaving = false)
  }
</script>

<div>
  <b>Name:</b>
  <span contenteditable bind:textContent={editableName}></span>
  {#if isChanged && !isSaving}
    <button onclick={handleSave}>save</button>
  {:else if isSaving}
    <i>saving...</i>
  {/if}
</div>
```

## Zapisovatelné `$derived`
Verze [5.25](https://github.com/sveltejs/svelte/releases/tag/svelte%405.25.0) toto mění přidáním možnosti zapisovat do
odvozené hodnoty, čímž zjednodušuje kód i práci a zlepšuje čitelnost.

```svelte
<script>
  /**
   * @type {{
   *   names: { first: string, last: string },
   *   saveNames: (first: string, last: string) => Promise<void>
   * }}
   */
  let {names, saveNames} = $props()

  let isSaving = $state(false)
  let fullName = $derived(`${names.first} ${names.last}`)
  let isChanged = $derived(fullName !== `${names.first} ${names.last}`)

  function handleSave() {
    isSaving = true
    let [first, last] = fullName.split(' ')
    saveNames(first, last)
      .finally(() => isSaving = false)
  }
</script>

<div>
  <b>Name:</b>
  <span contenteditable bind:textContent={fullName}></span>
  {#if isChanged && !isSaving}
    <button onclick={handleSave}>save</button>
  {:else if isSaving}
    <i>saving...</i>
  {/if}
</div>
```
<br>

Zajímavé je, že `read-only` nebylo kvůli nějaké technické překážce, ale bylo vytvořeno úmyslně. Implementace tak
obnášela hlavně [mazání kódu](https://github.com/sveltejs/svelte/pull/15570/files#diff-650c22803364b65b1d9aa3e102da4dba7e960b0808a9f0d66c199f408a0f1ab7).