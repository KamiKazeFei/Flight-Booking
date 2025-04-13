import Link from "next/link"
import { ChevronRight } from "lucide-react"

type BreadcrumbItem = {
  label: string
  href: string
  active?: boolean
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />}
            {item.active ? (
              <span className="text-gray-500" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-rose-600 hover:text-rose-800">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
