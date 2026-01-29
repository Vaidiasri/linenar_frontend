import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthForm } from '@/hooks/use-auth-form'

export default function Auth() {
  const {
    activeTab,
    setActiveTab,
    loginData,
    registerData,
    handleLogin,
    handleRegister,
    errors,
    isLoading,
  } = useAuthForm()

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Welcome back!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={loginData.email}
                  onChange={(e) => loginData.setEmail(e.target.value)}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => loginData.setPassword(e.target.value)}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>
              {errors.root && <p className="text-sm text-red-500 text-center">{errors.root}</p>}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="new-name">Name</Label>
                <Input
                  id="new-name"
                  type="text"
                  value={registerData.newName}
                  onChange={(e) => registerData.setNewName(e.target.value)}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={registerData.newEmail}
                  onChange={(e) => registerData.setNewEmail(e.target.value)}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-pass">Password</Label>
                <Input
                  id="new-pass"
                  type="password"
                  value={registerData.newPassword}
                  onChange={(e) => registerData.setNewPassword(e.target.value)}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>
              {errors.root && <p className="text-sm text-red-500 text-center">{errors.root}</p>}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleRegister} disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
