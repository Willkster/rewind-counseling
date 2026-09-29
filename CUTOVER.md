# Cutover: pointing rewindcounseling.com at this site

Do this in the **evening**. Between the DNS change and GitHub issuing the SSL
certificate there is a window, usually 5 to 15 minutes, where returning visitors
see a security warning. The old site sends HSTS with a 180 day max-age, so
browsers that have been there before will refuse to fall back to plain HTTP.

## Before you start

Have these two tabs open:

- Squarespace: Settings > Domains > rewindcounseling.com
- GitHub: github.com/Willkster/rewind-counseling/settings/pages

## Step 1: disconnect the domain from the Squarespace site

Squarespace > Domains > rewindcounseling.com.

Find where the domain is connected to the Squarespace **website** and disconnect
it. The domain stays registered with Squarespace. You are only breaking the link
between the domain and the old site.

**Skip this and Squarespace will keep overwriting the records you set in step 2.**

## Step 2: replace the website DNS records

Squarespace > Domains > rewindcounseling.com > DNS Settings.

**Delete** the "Squarespace Defaults" block. That is the four A records on `@`
and the `www` CNAME to `ext-sq.squarespace.com`.

**Do not touch anything else on that screen.** Specifically leave alone:

- Google Workspace (five MX records) — the practice's email
- Google Workspace Verification (TXT)
- Custom records: the SPF TXT, the `google._domainkey` DKIM TXT, the `_dmarc`
  TXT, and the `google83ab6a9c...` CNAME

**Add** these, in Custom records:

| Type  | Name  | Data                     |
|-------|-------|--------------------------|
| A     | @     | 185.199.108.153          |
| A     | @     | 185.199.109.153          |
| A     | @     | 185.199.110.153          |
| A     | @     | 185.199.111.153          |
| CNAME | www   | willkster.github.io      |

Note Squarespace stripped the spaces out of the SPF record last time. These have
no spaces, so that should not bite here, but check them after saving.

## Step 3: set the custom domain on GitHub

github.com/Willkster/rewind-counseling/settings/pages

Under "Custom domain", enter `www.rewindcounseling.com` and save. GitHub runs a
DNS check. It may fail for a few minutes until step 2 propagates. That is normal.

## Step 4: wait for the certificate

Same page. "Enforce HTTPS" stays greyed out until GitHub has issued the
certificate. Usually 5 to 15 minutes, occasionally longer.

Once the tickbox is available, tick it.

If it stalls past an hour: remove the custom domain, save, re-add it, save. That
retriggers provisioning.

## Step 5: verify

Claude runs these. Everything must pass:

    dig +short A rewindcounseling.com              # the four 185.199.x addresses
    dig +short CNAME www.rewindcounseling.com      # willkster.github.io
    curl -sI https://www.rewindcounseling.com/     # 200, valid certificate
    curl -sI http://www.rewindcounseling.com/      # 301 to https
    dig +short MX rewindcounseling.com             # still five Google records
    dig +short TXT rewindcounseling.com            # SPF and site-verification
    dig +short TXT google._domainkey.rewindcounseling.com
    dig +short TXT _dmarc.rewindcounseling.com

Then send a test email and confirm it still arrives.

## Step 6: only after all of that passes

Cancel or downgrade the Squarespace website plan. **Keep the domain
registration.** It stays at Squarespace Domains LLC, which is where the DNS
screen you have been using lives. Cancelling the website plan does not affect it.

## Rolling back

Put the four original A records back on `@` (198.49.23.144, 198.49.23.145,
198.185.159.144, 198.185.159.145) and point the `www` CNAME back at
`ext-sq.squarespace.com`, then reconnect the domain to the Squarespace site.
Nothing in this process destroys anything.
