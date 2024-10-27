---
title: Svelte 5 je venku
perex: Je to měsíc, kdy jsem si posmutnil, že vývoj Svelte 5 nebere konce a už je to tu! Proč jsem ale vlastně pětku tak vyhlížel? Protože přináší ještě větší míru reaktivity.
date: 2024-10-27
tags:
  - svelte
  - svelte5
  - reativita
---

## Svelte je kompilátor
Svelte jsem si zamiloval právě proto, že je "pouze" kompilátorem. Vezme kód a vygeneruje vanilla JS pro prohlížeč. Díky
tomu je kód rychlejší a menší v porovnání s&nbsp;frameworky React, nebo Vue.

Jako kompilátor umožňuje Svelte pracovat v&nbsp;podstatě s libovolnou syntaxí. Lze vytvořit vlastní nebo rozšířit
stávající. Proto Svelte komponenty vypadají jako HTML soubory. Mají `<script>` tag pro JavaScript, `<style>` tag, kam se
zapisuje CSS a vše ostatní je HTML.
```html
<script>
    function joke() {
        alert('Lidi lze rozdělit do 10 typů. Ti co znají binární soustavu a ti co ji neznají.')
    }
</script>

<button onclick={joke}>řekni vtip</button>

<style>
    button {
        --light: skyblue;
        --dark: darkblue;

        background-color: var(--light);
        color: var(--dark);
        border: 1px solid var(--dark);
        border-radius: .25rem;
        padding: 5px 20px;
    }
</style>
```

Začal jsem s weby v&nbsp;době, kdy jedna stránka byla jeden HTML soubor, proto mi Svelte komponenty přijdou tak přirozené.

## Svelte a reaktivita
Tam kde si ostatní frameworky vypomáhají virtuálním DOMem, Svelte synchronizuje DOM pomocí signálů. Na každou reaktivní
proměnnou (stav) je navěšeno každé její čtení jako listener (efekt).

Změnou stavu dojde k&nbsp;vyslání signálu všem listenerů s&nbsp;novou hodnotou. Tím se spustí závislé efekty a překreslí
se DOM podle nového stavu.

## Runy
Před pětkou Svelte využívalo syntaxi JS, kterou ohýbalo pro vytvoření reaktivity. To sice přinášelo neuvěřitelnou
pohodlnost, ale mělo to své limity, na něž nešlo nenarazit ve trochu složitějších situacích. Proto pětka přináší
[Runy](https://svelte.dev/docs/svelte/what-are-runes), kdy každá vytváří specifickou formu reaktivity. Runy se tváří jako
funkce, ale reálně je to Svelte syntaxe. Proto není potřeba žádný import a lze je využít i mimo komponentu.

Myšlenka signálů pochází z&nbsp;JS frameworku [Knockout](https://knockoutjs.com/), který s&nbsp;nimi přišel už
v&nbsp;roce 2010 a v&nbsp;posledních letech je zpopularizoval framework [Solid](https://www.solidjs.com/). Nejen Svelte,
ale i další frameworky implementují signály.

## Zpětná kompatabilita
Byť je pětka postavená na runách a signálech, stále lze bez problémů spustit čtyřkový kód a vše bude fungovat. Snad jen
o&nbsp;něco rychleji. Není tedy důvod nepřejít už teď.

Protože změna syntaxe není nijak zásadní, přichází s&nbsp;pětkou i [migrační nástroj](https://svelte.dev/docs/svelte/v5-migration-guide#Migration-script),
který většinu změn zvládne provést sám.

## Proxy
Velmi zajímavou novinkou pro mě bylo, jak Svelte detekuje změny v&nbsp;objektech a polích. Tam kde čtyřka vyžadovala
novou hodnotu znova přiřadit do proměnné, zvládá pětka přímou změnu.
```js
// Svelte 4
let numbers = [1, 2, 3]
let config = { widht: 320, height: 240, color: darkblue }

function addNumber(num) {
  numbers = [...numbers, num]
}

function setHeight(hgt) {
  config = { ...config, height: hgt }
}

// Svelte 5
let numbers = $state([1, 2, 3])
let config = { size: 24, color: blue, gap: 2 }

function addNumber(num) {
  numbers.push(num)
}
function setSize(size) {
  config.size = size
}
```
To je možné díky [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), která
obaluje původní objekt/pole a zajišťuje spuštění efektu při změně v libovolné hloubce.

## Snippety
Pro předání obsahu do komponenty byly ve čtyřce `slot`y. Nic převratného, svůj účel to plnilo. Ty nově nahrazují
[snippety](https://svelte.dev/docs/svelte/snippet), které už za převratné považuji. Není to totiž jen prosté označení
místa, kam se má obsah vložit, ale funkce s&nbsp;parametry, která se volá uvnitř obsahu komponenty.

Snippety lze definovat v komponentě a používat pro interní potřeby komponenty, ale i mimo komponentu a do komponenty je
poslat jako její parametry.

## A to není vše Horste
Společně s pětkou přichází i změny webů Svelte. Osobně se mi nový design až tak nelíbí, ale to jen proto, že nemám rád
patkové písmo. Jinak oceňuji sjednocení a zpřehlednění dokumentace i uhlazení [REPL](https://it-slovnik.cz/pojem/repl).

Pětka je současně branou k dalšímu vývoji Svelte, protože zjednodušuje a zpřehledňuje fungování kompilátoru, takže bude
snažší implementovat další vylepšení a framework dál pohodlně rozvíjet.