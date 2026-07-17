import { NextRequest, NextResponse } from "next/server";
import { searchCompanies, categories } from "@/lib/companies";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

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
