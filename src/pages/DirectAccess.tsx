import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Shield, User, Database, UserPlus, Upload } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { GrantDirectAccessDialog } from '@/components/access-control/GrantDirectAccessDialog';
import { RevokeAccessDialog } from '@/components/access-control/RevokeAccessDialog';
import { AddUserDialog } from '@/components/access-control/AddUserDialog';
import { AddModelDialog } from '@/components/access-control/AddModelDialog';

interface DirectAccessGrant {
  id: string;
  userName: string;
  userEmail: string;
  modelName: string;
  modelType: string;
  grantedAt: string;
  grantedBy: string;
}

const DirectAccess = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showGrantDialog, setShowGrantDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddModelDialog, setShowAddModelDialog] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<DirectAccessGrant | null>(null);

  // Mock current user role - replace with actual auth
  const currentUserRole = 'admin'; // Should be admin-only page

  // Mock data - replace with actual data fetching
  const directAccessGrants: DirectAccessGrant[] = [
    {
      id: '1',
      userName: 'Sarah Chen',
      userEmail: 'sarah.chen@company.com',
      modelName: 'Advanced Analytics Pro',
      modelType: 'Analytics',
      grantedAt: '2024-09-10',
      grantedBy: 'John Smith'
    },
    {
      id: '2',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@company.com',
      modelName: 'Premium Forecasting',
      modelType: 'Forecasting',
      grantedAt: '2024-09-08',
      grantedBy: 'John Smith'
    }
  ];

  const filteredGrants = directAccessGrants.filter(grant =>
    grant.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grant.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grant.modelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRevokeAccess = (grant: DirectAccessGrant) => {
    setSelectedGrant(grant);
  };

  if (currentUserRole !== 'admin') {
    return (
      <AppLayout>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Admin Access Required</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              You need admin privileges to manage direct access grants.
            </p>
          </CardContent>
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Direct Access</h1>
            <p className="text-muted-foreground">
              Grant individual users access to specific models outside of organization membership
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowAddUserDialog(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
            <Button variant="outline" onClick={() => setShowAddModelDialog(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Add Model
            </Button>
            <Button onClick={() => setShowGrantDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Grant Access
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search grants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {filteredGrants.length === 0 && searchQuery ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No grants found</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                No direct access grants match your search. Try a different search term.
              </p>
            </CardContent>
          </Card>
        ) : filteredGrants.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No direct access grants</h3>
              <p className="text-muted-foreground text-center max-w-sm mb-4">
                Use direct access for exceptions — grant specific users access to models outside of organization membership.
              </p>
              <Button onClick={() => setShowGrantDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Grant Access
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Active Direct Access Grants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGrants.map((grant) => (
                  <div key={grant.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{grant.userName}</span>
                          <span className="text-sm text-muted-foreground">({grant.userEmail})</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Database className="h-3 w-3 text-muted-foreground" />
                          <span>{grant.modelName}</span>
                          <Badge variant="outline" className="text-xs">
                            {grant.modelType}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Granted {formatDate(grant.grantedAt)} by {grant.grantedBy}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRevokeAccess(grant)}
                    >
                      Revoke Access
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <GrantDirectAccessDialog
        open={showGrantDialog}
        onOpenChange={setShowGrantDialog}
      />

      <AddUserDialog
        open={showAddUserDialog}
        onOpenChange={setShowAddUserDialog}
      />

      <AddModelDialog
        open={showAddModelDialog}
        onOpenChange={setShowAddModelDialog}
      />

      <RevokeAccessDialog
        grant={selectedGrant}
        open={!!selectedGrant}
        onOpenChange={(open) => !open && setSelectedGrant(null)}
      />
    </AppLayout>
  );
};

export default DirectAccess;