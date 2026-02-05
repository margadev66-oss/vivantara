import { describe, expect, it } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("merges Tailwind class conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })

  it("ignores falsy values", () => {
    expect(cn("text-base", false && "hidden", null, undefined, "")).toBe(
      "text-base"
    )
  })
})
