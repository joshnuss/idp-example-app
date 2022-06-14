<script>
  import auth from '$lib/auth'
  import '../app.css'
</script>

<div class="container">

  <header>
    <span class="title">My SaaS</span>

    <nav>
      <a href="/pricing">Pricing</a>

      {#if $auth.user}
        <a href="https://id.app.local:3002/account/portal">Settings</a>
        <a href="https://id.app.local:3002/signout" on:click={() => $auth.clear()}>Signout</a>
      {:else}
        <a href="https://id.app.local:3002/signup">Signup</a>
        <a href="https://id.app.local:3002/signin">Signin</a>
      {/if}
    </nav>
  </header>

  <slot/>

</div>
