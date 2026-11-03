import { portfolioApi, type PortfolioEndpoint } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(portfolioApi).map((endpoint) => ({ endpoint }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/[endpoint]">) {
  const { endpoint } = await ctx.params;
  if (!(endpoint in portfolioApi)) {
    return Response.json({ error: "endpoint tidak ditemukan", tersedia: Object.keys(portfolioApi) }, { status: 404 });
  }
  return Response.json(portfolioApi[endpoint as PortfolioEndpoint]);
}
