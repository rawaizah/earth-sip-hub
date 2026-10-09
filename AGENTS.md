<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep SIPPIN as one scrolling index page with anchor navigation because the brief explicitly requires a single-page experience.
- Keep prices and cart calculations in the shared products module so bag totals and collection prices use the same source.
- Use client-only in-session bag and preview discount interactions until commerce and email services are connected; never imply a payment or subscription succeeded.
- Define visual roles and component styling in the global design system so the requested brand palette stays consistent.
