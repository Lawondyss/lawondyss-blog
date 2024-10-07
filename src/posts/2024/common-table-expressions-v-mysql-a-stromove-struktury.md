---
title: Common Table Expressions v&nbsp;MySQL a stromové struktury
perex: Snad každý trochu zkušený webdeveloper narazil na problém uložení a rekonstrukce stromové struktury. Od doby, co MySQL představilo rekurzivní CTE, je to hračka.
date: 2024-10-07
tags:
  - mysql
  - cte
  - rekurze
  - php
---

## Stromová struktura

Kategorie na e-shopu jsou typickým příkladem problému, jak uložit a rekonstruovat stromovou strukturu. Uložení je na
první pohled jednoduché. Stačí tabulka, kde každá kategorie bude odkazovat na svého předka. To ale zásadně komplikuje
rekonstrukci kvůli `SELECT`u, který neumí rekurzi.

Objevovala se různá řešení tohoto problému od neefektivního rekurzivního volání `SELECT`ů pro každou kategorii,
přes komplikované udržování IDček nalevo a napravo, až po magii s&nbsp;`JOIN`y.

## Common Table Expressions (CTE)

CTE jsou pomyslnné temporary tabulky, které existují pouze po dobu provádění příkazu. Díky tomu si lze data poměrně
snadno připravit ještě před samotným příkazem.

Syntaxe je poměrně jednoduchá. Stačí začít slovíčkem `WITH`, zadat název, pod kterým budou data dostupná, jako by šlo
o&nbsp;tabulku a následuje samotný `SELECT` pro data.

```sql
WITH cte AS (
    SELECT id, name, parent_id
    FROM category
    WHERE parent_id IS NULL -- root nemá rodiče
)
SELECT * FROM cte
```

## Rekurze

Přidáním `RECURSIVE` se ze `SELECT`u uvnitř CTE stává seed. Data, která budou použita pro první iteraci. Data iterací
následují za `UNION` a je to právě následný `SELECT`, který se bude opakovat do doby, dokud bude vracet řádky.

```sql
WITH RECURSIVE cte AS (
    -- seed
    SELECT id, name, parent_id
    FROM category
    WHERE parent_id IS NULL
    
    UNION ALL
    
    -- rekurze
    SELECT category.id, category.name, category.parent_id
    FROM cte
    INNER JOIN category
        ON category.parent_id = cte.id
)
SELECT id, name, parent_id AS parentId
FROM cte
```

Výstupem je stream kategorií postupující podle úrovní od rootu až po nejhlubší potomky.

## Rekonstrukce

Kód pro rekonstrukci, pokud je zaručena existence nadřazené kategorie, je poměrně jednoduchý. Základem je objekt
kategorie, který si nese i seznam potomků.

```php
final class Category
{
    /** @var Category[] */
    public array $children = [];

    public function __construct(
      public readonly int $id,
      public readonly string $name,
      public readonly ?int $parentId,
    ) {}
}
```

Dále je potřeba dvou polí. Jedno udržuje seznam root kategorií a druhé je seznam všech kategorií indexovaný podle jejich
ID. To je potřeba pro získání rodiče aktuální kategorie, do kterého se kategorie přidá jako potomek.

```php
$categories = $roots = [];

foreach ($sqlResult as $row) {
    $category = new Category(...$row);

    $categories[$category->id] = $category;

    if (isset($category->parentId)) {
        $categories[$category->parentId]->children[] = $category;
    } else {
        $roots[] = $category;
    }
}
```

Díky objektům, které si udržují stav bez ohledu na to, odkud jsou upravovány, je v poli `$roots` vrchol stromu
kategorií, který už lze snadno vykreslit.

## Řazení

Výsledné řazení kategorií je však chaotické. Pro abecední řazení bude dotaz vyžadovat trochu více lásky. Seřadit kategorie
jen podle názvu zničí zaručené pořadí úrovní, takže je potřeba jednotlivé úrovně očíslovat a následně seřadit podle
úrovní a názvu.

```sql
WITH RECURSIVE cte AS (
    SELECT id, name, parent_id,
        -- inicializační hodnota
        0 AS level
    FROM category
    WHERE parent_id IS NULL

    UNION ALL

    SELECT category.id, category.name, category.parent_id,
        -- každou iterací se navýší o 1
        cte.level + 1 AS level
    FROM cte
    INNER JOIN category
        ON category.parent_id = cte.id
)
SELECT id, name, parent_id AS parentId
FROM cte
ORDER BY level, name
```
Tím zůstane zachováno pořadí úrovní od rootu a každá úroveň bude seřazena abecedně.

## Seznam aktivních kategorií

Společně se stromovou strukturou přichází i potřeba zjistit všechny aktivní uzly, pro vykreslení otevřené cesty od
aktuální kategorie k rootu. I zde je rekurze v CTE zásadním pomocníkem.

```sql
WITH RECURSIVE cte AS (
    SELECT id, parent_id
    FROM category
    WHERE id = 42 -- ID kategorie

    UNION ALL

    SELECT category.id, category.parent_id
    FROM cte
    INNER JOIN category
      ON category.id = cte.parent_id
)
SELECT JSON_ARRAYAGG(id) AS ids
FROM cte
```

Pro snažší práci s výsledkem je použita groupovací funkce, jejímž výsledkem je JSON pole s IDčkami kategorií od aktuální
až po nejvyšší úroveň.

