<script>
  import auth from '$lib/auth'
</script>

<h1>Welcome to My SaaS</h1>

{#if !$auth.loading}
  {#if $auth.user}
    <p>Welcome <b>{$auth.name}</b>! You're on the <b>{$auth.product}</b> plan.</p>

    {#if $auth.audience == 'basic'}
      <p>
        Special offer. Upgrade to the <a href="https://id.app.local:3002/account/switch/pro">PRO plan</a>!
      </p>
    {/if}
  {:else}
    Good day, would you like to <a href="https://id.app.local:3002/signup">Signup</a>?
  {/if}
{/if}

<pre>auth = {JSON.stringify($auth, null, 2)}</pre>
