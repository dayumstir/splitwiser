import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const groups = [
  { id: 1, name: "Roommates", members: 3 },
  { id: 2, name: "Trip to Paris", members: 4 },
  { id: 3, name: "Family", members: 5 },
];

export default function Groups() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Groups</h1>
      <div className="space-y-4">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{group.members} members</p>
              <Link href={`/groups/${group.id}`}>
                <Button variant="link" className="p-0">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="w-full">Create New Group</Button>
    </div>
  );
}
