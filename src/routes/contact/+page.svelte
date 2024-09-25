<script lang="ts">
  import Icon from '$atoms/Icon.svelte'
</script>

<h1>Kontakty na mě</h1>

<section>
  <h2>
    <Icon name="email" height="var(--size-l)"/> E-mail
  </h2>
  <a href="mailto:lad.von@gmail.com">lad.von@gmail.com</a>
  <p>Skvělý pro první kontakt s představením vašeho projektu&nbsp;💪</p>
</section>

<section>
  <h2>
    <Icon name="whatsApp" height="var(--size-l)"/> WhatsApp
  </h2>
  <a href="https://wa.me/420608449000" target="_blank">Láďa Vondráček</a>
  <p>Psaná a pro mě ideální forma rychlé komunikace&nbsp;🤗</p>
</section>

<section>
  <h2>
    <Icon name="signal" height="var(--size-m)"/> Signal
  </h2>
  <a href="https://signal.me/#eu/275iesodtqXqaz879oHdJg44_1C0TBz1W44E5N5AztbDEX9EoIdPD7QI_9MgptQn" target="_blank">Lawondyss.42</a>
  <p>Pokud dáváte přednost bezpečnější komunikaci&nbsp;🥸</p>
</section>

<section>
  <h2>
    <Icon name="phone" height="var(--size-l)" /> Telefon
  </h2>
  <a href="tel:420608449000">(+420) 608 449 000</a>
  <p>Introverti sice neradi telefonují, ale vést hovory zvládám&nbsp;😅</p>
</section>

<section>
  <h2>
    <Icon name="ico" height="var(--size-l)" />IČO
  </h2>
  <a href="https://www.rzp.cz/cgi-bin/aps_cacheWEB.sh?VSS_SERV=ZVWSBJFND&Action=Search&ICO=88824284&VYPIS=2"
     target="_blank">88824284</a>
  <p>Jako správný freelancer mám i své identifikační číslo&nbsp;📇</p>
</section>

<section>
  <h2>
    <Icon name="datovka" height="var(--size-l)" />Datovka
  </h2>
  <a href="https://info.mojedatovaschranka.cz/info/cs/search.html?q=bf3m2fe"
     target="_blank">bf3m2fe</a>
  <p>Datová schránka nesmí chybět&nbsp;🗳️</p>
</section>

<style>
  * + * {
    padding-bottom: 1rem;
  }

  h2 {
    display: flex;
    align-items: center;
    gap: var(--size-xxs);
    padding-bottom: 0;
  }
</style>
