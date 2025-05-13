---
title: Sdílení stavů ve Svelte 5
perex: Svelte 5 přináší nové možnosti pro sdílení stavů mezi komponentami. Díky Context API a runám už nemusíme používat prop drilling nebo globální stavy.
date: 2025-01-27
tags:
  - svelte
  - svelte5
  - state
  - context
---

## K čemu je dobré sdílení stavů

Při vývoji aplikací je často potřeba sdílet stav mezi různými komponentami. Typickým příkladem je zobrazování
modálního okna. Častým řešením bylo tyto stavy předávat přes props skrz celou hierarchii komponent (tzv. Prop
Drilling):

```svelte
<A>
    <B {modal}>
        <C {modal}>
            <D {modal}/> <!-- pouze D potřebuje modal -->
        </C>
    </B>
</A>
```

## Proč je špatné ukládat stav na serveru

Runa `$state` svádí k jednoduchému vytvoření globálního stavu v samostatném souboru, který je importován v konkrétní
komponentě.

#### modal-state.svelte.js
```js
export const modalState = $state({
    content: null,
})
```

#### Modal.svelte
```svelte
<script>
    import { modalState } from './modal-state.svelte'

    let dialogElm

    const onclose = () => {
        modalState.content = null
    }

    $effect(() => {
        modalState.content !== null
            ? dialogElm.showModal()
            : (dialogElm.open && dialogElm.close())
    })
</script>

<dialog bind:this={dialogElm} {onclose}>{modalState.content}</dialog>
```

#### D.svelte
```svelte
<script>
    import { modalState } from './modal-state.svelte'
    
    const openModal = () => {
        modalState.content = 'Hello world!'
    }
</script>

<button onclick={openModal}>👋</button>
```

Tento přístup má však zásadní nevýhodu. Stav na serveru je sdílený mezi všemi uživateli! Modal tudíž uvidí každý aktivní
uživatel. V případě modalu je to "jen" nepříjemnost, ale pokud se takto sdílí přihlášený uživatel, je to katastrofa.

## Řešením je setContext() a getContext()

Svelte nabízí elegantní řešení pomocí Context API, jež sdílí stavy pouze v rámci uživatelovi relace. Z toho vyplývá i potřeba
volat Context právě a pouze při inicializaci komponenty. Pro čiščí přístup je logika v blackboxu a nabídnuto je jednoznačné API.

#### modal-context.svelte.js
```js
import { getContext, setContext } from 'svelte'

const ModalKey = Symbol('modal')

export function initModal() {
    const props = $state({
        content: null,
    })
    setContext(ModalKey, props)
}

export function getModal() {
    const props = getContext(ModalKey)
    return {
        open: (content) => {
            props.content = content
        },
    }
}

export function getModalProps() {
    return getContext(ModalKey)
}
```

Funkce `initModal()` je volána v místě, kde je komponenta Modal vykreslena. Nejpříhodnějším místem je root aplikace.
Tím je buď App.svelte nebo +layout.svelte při použití SvelteKit.

Funkce `getModalProps()` je určena pro komponentu Modal, které předává `content` jako reaktivní proměnnou.
```svelte
<script>
    import { getModalProps } from './modal-context.svelte'

    const props = getModalProps()
    let dialogElm

    const onclose = () => {
        props.content = null
    }

    $effect(() => {
        props.content !== null
            ? dialogElm.showModal()
            : (dialogElm.open && dialogElm.close())
    })
</script>

<dialog bind:this={dialogElm} {onclose}>{props.content}</dialog>
```

Otevření modalu je díky funkci `getModal()` jednoduché a intuitivní a lze ho pohodlně ovládat odkudkoliv.

```svelte
<script>
    import { getModal } from './modal-props.svelte'

    const modal = getModal()

    const openModal = () => {
        modal.open('Hello world!')
    }
</script>

<button onclick={openModal}>👋</button>
```
