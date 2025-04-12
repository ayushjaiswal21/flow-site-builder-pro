
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, User } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"hr" | "candidate">("hr");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      // Create mock user for demo purposes
      const mockUser: User = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        name: email.split('@')[0],
        email: email,
        role: role,
        avatar: null
      };
      
      login(mockUser);
      
      toast({
        title: "Login successful",
        description: `Welcome to the ${role === "hr" ? "HR" : "Candidate"} dashboard`,
      });
      navigate(role === "hr" ? "/hr/dashboard" : "/candidate/dashboard");
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6 p-6 bg-white shadow-sm rounded-lg border">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Log in</h1>
            <p className="text-muted-foreground">
              Enter your email below to log in to your account
            </p>
          </div>
          
          <Tabs defaultValue="hr" onValueChange={(value) => setRole(value as "hr" | "candidate")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hr">HR Professional</TabsTrigger>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hr" className="mt-4 space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="hr-email">Email</Label>
                  <Input
                    id="hr-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hr-password">Password</Label>
                    <a
                      href="#"
                      className="text-sm text-primary underline underline-offset-4"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="hr-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Log in"}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-primary underline underline-offset-4"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="candidate" className="mt-4 space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="candidate-email">Email</Label>
                  <Input
                    id="candidate-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="candidate-password">Password</Label>
                    <a
                      href="#"
                      className="text-sm text-primary underline underline-offset-4"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="candidate-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Log in"}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  First time taking a test?{" "}
                  <a
                    href="#"
                    className="text-primary underline underline-offset-4"
                  >
                    Use your test link
                  </a>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
