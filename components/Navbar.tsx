import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";
import { prisma, withPrismaFallback } from "@/lib/prisma";

const ENGAGE_CHILDREN = [
  { title: "Services Overview", url: "/engage/services-overview" },
  { title: "How It Works", url: "/engage/how-it-works" },
];

function normalizeEngageChildren(
  children: Array<{ id: string; title: string; url: string | null; order: number }>
) {
  const byUrl = new Map(children.map((child) => [child.url, child]));

  return ENGAGE_CHILDREN.map((item, index) => {
    const existing = byUrl.get(item.url);
    return {
      id: existing?.id ?? `engage-fallback-${index}`,
      title: item.title,
      url: item.url,
      order: index,
    };
  });
}

export default async function Navbar() {
  const menuItems = await withPrismaFallback(
    () =>
      prisma.menuItem.findMany({
        where: { parentId: null },
        select: {
          id: true,
          title: true,
          url: true,
          order: true,
          children: {
            select: {
              id: true,
              title: true,
              url: true,
              order: true,
            },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      }),
    [],
    "Navbar.menuItems"
  );

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-warmth/20 bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/78 shadow-[0_16px_40px_-28px_rgba(16,25,37,0.6)]">
        <div className="flex h-[76px] items-center justify-between px-4 md:px-6">
          <Link href="/home" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-warmth/25 bg-white/85">
              <Image src="/logo.png" alt="Vivartana Logo" fill className="object-cover scale-110" priority />
            </div>
            <div>
              <p className="text-sm font-medium tracking-wide text-thought/78">Vivartana Transformation Services</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {menuItems.map((item) => (
              <div key={item.id} className="group relative">
                {(() => {
                  const visibleChildren =
                    item.url === "/engage"
                      ? normalizeEngageChildren(item.children)
                      : item.children;

                  return (
                    <>
                <Link
                  href={item.url || "#"}
                  className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-thought/78 hover:text-action transition-colors"
                >
                  {item.title}
                  {visibleChildren.length > 0 ? <ChevronDown size={14} className="mt-[1px]" /> : null}
                </Link>

                {visibleChildren.length > 0 ? (
                  <div className="invisible absolute left-0 top-[calc(100%+14px)] w-72 translate-y-1 rounded-xl border border-warmth/20 bg-surface p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {visibleChildren.map((child) => (
                      <Link
                        key={child.id}
                        href={child.url || "#"}
                        className="block rounded-lg px-3 py-2.5 text-sm text-thought/78 hover:bg-canvas hover:text-action transition-colors"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
                    </>
                  );
                })()}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="cta-button self-center h-8 rounded-lg px-2 text-[10px] leading-none whitespace-nowrap sm:px-2.5 sm:text-[11px]"
              >
              <span className="hidden sm:inline">Start a Conversation</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight size={11} />
            </Link>

            <details className="relative lg:hidden">
              <summary className="list-none cursor-pointer rounded-xl border border-warmth/25 bg-white/80 p-2.5 text-thought/80 hover:text-action transition-colors">
                <Menu size={18} />
              </summary>
              <div className="absolute right-0 top-[calc(100%+10px)] w-[min(80vw,320px)] rounded-xl border border-warmth/20 bg-surface p-2 shadow-2xl">
                {menuItems.map((item) => (
                  <div key={item.id} className="rounded-lg">
                    {(() => {
                      const visibleChildren =
                        item.url === "/engage"
                          ? normalizeEngageChildren(item.children)
                          : item.children;

                      return (
                        <>
                    <Link href={item.url || "#"} className="block rounded-lg px-3 py-2 text-sm font-medium text-thought/85 hover:bg-canvas">
                      {item.title}
                    </Link>
                    {visibleChildren.length > 0 ? (
                      <div className="ml-2 border-l border-warmth/20">
                        {visibleChildren.map((child) => (
                          <Link
                            key={child.id}
                            href={child.url || "#"}
                            className="block rounded-lg px-3 py-2 text-sm text-thought/70 hover:bg-canvas hover:text-action"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                        </>
                      );
                    })()}
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </nav>
    </header>
  );
}

