# Launch on GitHub Pages

## Review before the domain move

1. Push the reviewed source and lockfile to `main` in `ejmeitz/website`.
2. In repository Settings → Pages, select GitHub Actions as the source. GitHub Free requires a public repository; keeping the source private requires a supporting paid plan. Set the Actions repository variable `PAGES_ENABLED` to `true` once Pages is enabled. Until then the workflow validates the site without attempting deployment.
3. Run the **Validate and deploy website** workflow. Check that build and deployment succeed.
4. Review `https://ejmeitz.github.io/website/` on desktop and a phone. Follow research links, load a game, play a video, and verify old links such as `/website/research/phd/`.
5. Configure Formspree using the README and verify a real message arrives. Before that, the contact page deliberately uses a LinkedIn fallback.

Keep the old Heroku app and its domain configuration active throughout this review. Save a copy of the existing Namecheap DNS records before making changes.

## Domain cutover

1. Verify ownership of `ethanmeitz.com` in the GitHub account’s Pages settings. Add the exact TXT record GitHub provides in Namecheap → Domain List → Manage → Advanced DNS. Keep that verification record afterward.
2. Set repository Actions variables `SITE_URL` to `https://ethanmeitz.com` and `BASE_PATH` to `/`. Set the repository’s Pages custom domain to `ethanmeitz.com` and run the deployment workflow. Confirm the custom-domain build succeeds before switching DNS.
3. In Namecheap Advanced DNS, replace only the web-hosting records for `@` and `www`. Remove conflicting Heroku A/AAAA/ALIAS/CNAME or URL-redirect records for those hosts. Leave MX, mail-related TXT, domain-verification TXT, and unrelated subdomains unchanged.
4. Set four A records for host `@` with automatic TTL:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
5. Set a CNAME for host `www` to `ejmeitz.github.io` (no repository path). Do not use a wildcard record. Verify current record values against GitHub’s documentation at cutover time.
6. Allow DNS propagation. When GitHub finishes issuing the certificate, enable **Enforce HTTPS**. Verify `https://ethanmeitz.com` and the `www` redirect, nested page refreshes, image loading, 404 handling, and contact delivery. Add the custom domain in Formspree’s domain restrictions if enabled.
7. Only after the new site is confirmed working and DNS has propagated, remove the domain from Heroku and stop the old app. Export any contact messages or historical records you wish to retain before deleting backend resources. Retiring Heroku and deleting data are separate actions; nothing in this repository does either automatically.

GitHub Actions deployment does not require a `CNAME` file; the domain is managed in Pages settings. Expect DNS and certificate provisioning to take time, potentially up to 24 hours each.

## Rollback

If cutover fails, restore the saved Namecheap web-hosting records while Heroku still serves the domain. To resume GitHub project-URL review, remove the Pages custom domain, restore repository variables to `SITE_URL=https://ejmeitz.github.io` and `BASE_PATH=/website`, and redeploy. Keep the domain-verification TXT record.

## References

- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Formspree form setup](https://formspree.io/html/)
