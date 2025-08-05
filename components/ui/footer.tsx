export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container max-w-[1025px] mx-auto px-4">
        <div className="flex justify-center">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Will Samatis. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
} 