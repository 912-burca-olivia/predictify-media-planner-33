import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Settings } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { MembersTab } from '@/components/access-control/MembersTab';
import { ModelsTab } from '@/components/access-control/ModelsTab';

interface Organization {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  modelCount: number;
  createdAt: string;
}

const OrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');

  // Mock current user role - replace with actual auth
  const currentUserRole = 'admin'; // 'admin' or 'member'

  // Mock data - replace with actual data fetching
  const organization: Organization = {
    id: id || '1',
    name: 'Marketing Team',
    description: 'Marketing and growth team managing customer acquisition campaigns',
    memberCount: 8,
    modelCount: 5,
    createdAt: '2024-01-15'
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin Panel
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{organization.name}</h1>
              <Badge variant={currentUserRole === 'admin' ? 'default' : 'secondary'}>
                {currentUserRole}
              </Badge>
            </div>
            {organization.description && (
              <p className="text-muted-foreground max-w-2xl">{organization.description}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Created {formatDate(organization.createdAt)}
            </p>
          </div>
          
          {currentUserRole === 'admin' && (
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organization.memberCount}</div>
              <p className="text-xs text-muted-foreground">
                Active organization members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organization.modelCount}</div>
              <p className="text-xs text-muted-foreground">
                Models available to all members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{currentUserRole}</div>
              <p className="text-xs text-muted-foreground">
                {currentUserRole === 'admin' 
                  ? 'Can manage members and models' 
                  : 'Read-only access'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="space-y-4">
            <MembersTab organizationId={organization.id} userRole={currentUserRole} />
          </TabsContent>
          
          <TabsContent value="models" className="space-y-4">
            <ModelsTab organizationId={organization.id} userRole={currentUserRole} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default OrganizationDetails;