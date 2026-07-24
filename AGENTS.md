<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Type checking & dist dirs

Use `npm run typecheck` (= `next typegen && tsc --noEmit`), not bare `tsc`, after adding/removing/renaming routes — the typegen step refreshes the generated route validator so it can't reference deleted route files.

Parallel sessions build into separate dist dirs via `NEXT_DIST_DIR=.next-<name>` (Next locks `<dist>/dev` per dir). `experimental.strictRouteTypes` in next.config.ts wires generated route types through `next-env.d.ts` (current dist dir only), so stale sibling `.next-*` dirs are harmless. Never add `.next*/types` globs back to tsconfig `include` — that re-couples every dist dir to `tsc`/`next build` and stale ones break both.
