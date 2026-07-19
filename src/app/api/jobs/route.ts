import { NextRequest, NextResponse } from "next/server";
import { searchCompanies, categories } from "@/lib/companies";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const rawLimit = parseInt(searchParams.get("limit") || "50", 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 50;

  if (query.length > 200) {
    return NextResponse.json({ error: "Query too long" }, { status: 400 });
  }

  const matched = searchCompanies(query, category || undefined);

  const total = matched.length;
  const start = (page - 1) * limit;
  const paged = matched.slice(start, start + limit);

  return NextResponse.json({
    companies: paged,
    categories,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
