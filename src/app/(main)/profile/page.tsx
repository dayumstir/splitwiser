import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"

export default function Profile() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="john@example.com" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Push Notifications</Label>
          <Switch id="notifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch id="darkMode" />
        </div>
        <Button className="w-full">Save Changes</Button>
        <Button variant="outline" className="w-full">
          Logout
        </Button>
      </div>
    </div>
  )
}

