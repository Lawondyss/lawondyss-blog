<script lang="ts">
	import { page } from '$app/stores'

    type PageError = { emoji: string, message: string }

    const errors: Record<number, PageError> = {
        0: {
            emoji: '🙄',
            message: 'Co to sakra! No tak tohle definitivně nefunguje.',
        },
        404: {
            emoji: '🙈',
            message: 'Tak zrovna tohle tu nemám.',
        },
    }

    let error: PageError = errors[0]
    page.subscribe(page => {
        error = errors[page.status] ?? errors[0]
    })
</script>

<h1>{error.emoji}</h1>
<h2>{error.message}</h2>
<p>Asi bude lepší začít <a href="/">znova</a>.</p>

<style>
    h1, h2, p {
        text-align: center;
    }

    h1 {
        font-size: 4rem;
    }

    h2 {
        margin-top: 0;
    }
</style>
