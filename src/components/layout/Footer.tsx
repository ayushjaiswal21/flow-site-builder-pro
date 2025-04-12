
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn("border-t bg-white", className)}>
      <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-4">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-primary font-bold text-xl">SkillProve</div>
          <p className="text-sm text-muted-foreground mt-1">
            Advanced AI assessment platform
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-sm font-medium">Platform</h3>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#integrations" className="text-sm text-muted-foreground hover:text-foreground">Integrations</a>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-sm font-medium">Company</h3>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">About Us</a>
            <a href="#careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</a>
            <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</a>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-sm font-medium">Support</h3>
            <a href="#support" className="text-sm text-muted-foreground hover:text-foreground">Help Center</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</a>
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
          </div>
        </div>
      </div>
      
      <div className="container border-t py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} SkillProve. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
