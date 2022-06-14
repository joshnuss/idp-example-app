<script>
  import auth from '$lib/auth'
</script>

<h1>Welcome to My SaaS</h1>

{#if !$auth.loading}
  {#if $auth.user}
    <p>Welcome <b>{$auth.name}</b>! You're on the <b>{$auth.product}</b> plan.</p>
  {:else}
    Non-member
  {/if}
{/if}

<pre>auth = {JSON.stringify($auth, null, 2)}</pre>
