import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users, Database, Calendar } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { CreateOrganizationDialog } from '@/components/access-control/CreateOrganizationDialog';

interface Organization {
  id: string;
  name: string;
  memberCount: number;
  modelCount: number;
  createdAt: string;
  updatedAt: string;
}

const Organizations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock data - replace with actual data fetching
  const organizations: Organization[] = [
    {
      id: '1',
      name: 'Marketing Team',
      memberCount: 8,
      modelCount: 5,
      createdAt: '2024-01-15',
      updatedAt: '2024-09-10'
    },
    {
      id: '2',
      name: 'Product Development',
      memberCount: 12,
      modelCount: 8,
      createdAt: '2024-02-20',
      updatedAt: '2024-09-08'
    },
    {
      id: '3',
      name: 'Data Science',
      memberCount: 6,
      modelCount: 12,
      createdAt: '2024-03-10',
      updatedAt: '2024-09-05'
    }
  ];

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
            <p className="text-muted-foreground">
              Manage organizations, members, and model access
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Organization
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {filteredOrganizations.length === 0 && searchQuery ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No organizations found</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                No organizations match your search. Try a different search term.
              </p>
            </CardContent>
          </Card>
        ) : filteredOrganizations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No organizations yet</h3>
              <p className="text-muted-foreground text-center max-w-sm mb-4">
                Create your first organization to start managing members and model access.
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Organization
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrganizations.map((org) => (
              <Card 
                key={org.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/organizations/${org.id}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{org.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      Members
                    </div>
                    <Badge variant="secondary">{org.memberCount}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Database className="mr-1 h-4 w-4" />
                      Models
                    </div>
                    <Badge variant="secondary">{org.modelCount}</Badge>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground pt-2 border-t">
                    <Calendar className="mr-1 h-3 w-3" />
                    Updated {formatDate(org.updatedAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CreateOrganizationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </AppLayout>
  );
};

export default Organizations;