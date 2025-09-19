import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, Users, Database, Key, Search, Plus } from 'lucide-react';
import { CreateOrganizationDialog } from '@/components/access-control/CreateOrganizationDialog';
import { AddUserDialog } from '@/components/access-control/AddUserDialog';
import { AddModelDialog } from '@/components/access-control/AddModelDialog';
import { EditModelDialog } from '@/components/access-control/EditModelDialog';
import { GrantDirectAccessDialog } from '@/components/access-control/GrantDirectAccessDialog';
import { RevokeAccessDialog } from '@/components/access-control/RevokeAccessDialog';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with actual data fetching
const organizations = [
  {
    id: '1',
    name: 'Marketing Team',
    memberCount: 12,
    modelCount: 5,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Sales Division',
    memberCount: 8,
    modelCount: 3,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Product Development',
    memberCount: 15,
    modelCount: 7,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22'
  }
];

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    organization: 'Marketing Team',
    role: 'admin',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    organization: 'Sales Division',
    role: 'member',
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    organization: null,
    role: null,
    createdAt: '2024-01-17'
  }
];

const models = [
  {
    id: '1',
    name: 'Customer Segmentation Model',
    market: 'Consumer Goods',
    organization: 'Marketing Team',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'Sales Forecasting Model',
    market: 'B2B Software',
    organization: 'Sales Division',
    createdAt: '2024-01-12'
  },
  {
    id: '3',
    name: 'Product Optimization Model',
    market: 'E-commerce',
    organization: null,
    createdAt: '2024-01-14'
  }
];

const directAccessGrants = [
  {
    id: '1',
    user: { name: 'Alice Wilson', email: 'alice.wilson@company.com' },
    model: { name: 'Premium Analytics Model', market: 'Financial Services' },
    grantedAt: '2024-01-18',
    grantedBy: 'John Doe'
  }
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQueries, setSearchQueries] = useState({
    organizations: '',
    users: '',
    models: '',
    directAccess: ''
  });

  // Dialog states
  const [showCreateOrganization, setShowCreateOrganization] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddModel, setShowAddModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [showGrantAccess, setShowGrantAccess] = useState(false);
  const [showRevokeAccess, setShowRevokeAccess] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  // Mock user role - replace with actual auth
  const userRole = 'admin';

  // Filter functions
  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQueries.organizations.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQueries.users.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQueries.users.toLowerCase()) ||
    (user.organization?.toLowerCase().includes(searchQueries.users.toLowerCase()) || false)
  );

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchQueries.models.toLowerCase()) ||
    model.market.toLowerCase().includes(searchQueries.models.toLowerCase()) ||
    (model.organization?.toLowerCase().includes(searchQueries.models.toLowerCase()) || false)
  );

  const filteredDirectAccess = directAccessGrants.filter(grant =>
    grant.user.name.toLowerCase().includes(searchQueries.directAccess.toLowerCase()) ||
    grant.user.email.toLowerCase().includes(searchQueries.directAccess.toLowerCase()) ||
    grant.model.name.toLowerCase().includes(searchQueries.directAccess.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleRevokeAccess = (grant: any) => {
    setSelectedGrant(grant);
    setShowRevokeAccess(true);
  };

  const handleEditModel = (model: any) => {
    setSelectedModel(model);
    setShowEditModel(true);
  };

  if (userRole !== 'admin') {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <Key className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Admin Access Required</h3>
          <p className="text-muted-foreground">
            You need administrator privileges to access this panel.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage organizations, users, models, and access permissions
          </p>
        </div>

        <Tabs defaultValue="organizations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="organizations" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organizations
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Models
            </TabsTrigger>
            <TabsTrigger value="direct-access" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Direct Access
            </TabsTrigger>
          </TabsList>

          {/* Organizations Tab */}
          <TabsContent value="organizations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Organizations</h2>
                <p className="text-muted-foreground">Manage organizational units and their access</p>
              </div>
              <Button onClick={() => setShowCreateOrganization(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Organization
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
                value={searchQueries.organizations}
                onChange={(e) => setSearchQueries(prev => ({ ...prev, organizations: e.target.value }))}
                className="max-w-sm"
              />
            </div>

            {filteredOrganizations.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQueries.organizations ? 'No organizations found' : 'No organizations yet'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQueries.organizations 
                      ? 'Try adjusting your search criteria' 
                      : 'Create your first organization to get started'
                    }
                  </p>
                  {!searchQueries.organizations && (
                    <Button onClick={() => setShowCreateOrganization(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Organization
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredOrganizations.map((org) => (
                  <Card key={org.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader onClick={() => navigate(`/admin/organizations/${org.id}`)}>
                      <CardTitle className="flex items-center justify-between">
                        {org.name}
                      </CardTitle>
                      <CardDescription>
                        {org.memberCount} members • {org.modelCount} models
                      </CardDescription>
                    </CardHeader>
                    <CardContent onClick={() => navigate(`/admin/organizations/${org.id}`)}>
                      <div className="text-sm text-muted-foreground">
                        Created {formatDate(org.createdAt)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Users</h2>
                <p className="text-muted-foreground">Manage system users and their organization membership</p>
              </div>
              <Button onClick={() => setShowAddUser(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQueries.users}
                onChange={(e) => setSearchQueries(prev => ({ ...prev, users: e.target.value }))}
                className="max-w-sm"
              />
            </div>

            {filteredUsers.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQueries.users ? 'No users found' : 'No users yet'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQueries.users 
                      ? 'Try adjusting your search criteria' 
                      : 'Add your first user to get started'
                    }
                  </p>
                  {!searchQueries.users && (
                    <Button onClick={() => setShowAddUser(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Added {formatDate(user.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user.organization ? (
                          <>
                            <Badge variant="outline">{user.organization}</Badge>
                            {user.role && (
                              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                {user.role}
                              </Badge>
                            )}
                          </>
                        ) : (
                          <Badge variant="outline">No organization</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Models</h2>
                <p className="text-muted-foreground">Manage system models and their organization assignments</p>
              </div>
              <Button onClick={() => setShowAddModel(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Model
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search models..."
                value={searchQueries.models}
                onChange={(e) => setSearchQueries(prev => ({ ...prev, models: e.target.value }))}
                className="max-w-sm"
              />
            </div>

            {filteredModels.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQueries.models ? 'No models found' : 'No models yet'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQueries.models 
                      ? 'Try adjusting your search criteria' 
                      : 'Add your first model to get started'
                    }
                  </p>
                  {!searchQueries.models && (
                    <Button onClick={() => setShowAddModel(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Model
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredModels.map((model) => (
                  <Card key={model.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Database className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-muted-foreground">{model.market}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Created {formatDate(model.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {model.organization ? (
                          <Badge variant="outline">{model.organization}</Badge>
                        ) : (
                          <Badge variant="outline">Unassigned</Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditModel(model)}
                        >
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Direct Access Tab */}
          <TabsContent value="direct-access" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Direct Access</h2>
                <p className="text-muted-foreground">Manage direct user-to-model access grants</p>
              </div>
              <Button onClick={() => setShowGrantAccess(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Grant Access
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search direct access grants..."
                value={searchQueries.directAccess}
                onChange={(e) => setSearchQueries(prev => ({ ...prev, directAccess: e.target.value }))}
                className="max-w-sm"
              />
            </div>

            {filteredDirectAccess.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Key className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQueries.directAccess ? 'No grants found' : 'No direct access grants'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQueries.directAccess 
                      ? 'Try adjusting your search criteria' 
                      : 'Use this for exceptions to organization-based access'
                    }
                  </p>
                  {!searchQueries.directAccess && (
                    <Button onClick={() => setShowGrantAccess(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Grant Access
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredDirectAccess.map((grant) => (
                  <Card key={grant.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{grant.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{grant.user.name}</div>
                          <div className="text-sm text-muted-foreground">{grant.user.email}</div>
                        </div>
                        <div className="text-muted-foreground">→</div>
                        <div>
                          <div className="font-medium">{grant.model.name}</div>
                          <div className="text-sm text-muted-foreground">{grant.model.market}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right text-sm text-muted-foreground">
                          <div>Granted {formatDate(grant.grantedAt)}</div>
                          <div>by {grant.grantedBy}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevokeAccess(grant)}
                        >
                          Revoke
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <CreateOrganizationDialog
        open={showCreateOrganization}
        onOpenChange={setShowCreateOrganization}
      />

      <AddUserDialog
        open={showAddUser}
        onOpenChange={setShowAddUser}
      />

      <AddModelDialog
        open={showAddModel}
        onOpenChange={setShowAddModel}
      />

      <GrantDirectAccessDialog
        open={showGrantAccess}
        onOpenChange={setShowGrantAccess}
      />

      <EditModelDialog
        open={showEditModel}
        onOpenChange={setShowEditModel}
        model={selectedModel}
      />

      <RevokeAccessDialog
        open={showRevokeAccess}
        onOpenChange={setShowRevokeAccess}
        grant={selectedGrant}
      />
    </AppLayout>
  );
};

export default AdminPanel;