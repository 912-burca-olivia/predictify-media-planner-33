import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Shield, User, Mail, Calendar } from 'lucide-react';
import { InviteMemberDialog } from './InviteMemberDialog';
import { RemoveMemberDialog } from './RemoveMemberDialog';
import { ChangeRoleDialog } from './ChangeRoleDialog';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  joinedAt: string;
  avatar?: string;
}

interface MembersTabProps {
  organizationId: string;
  userRole: 'admin' | 'member';
}

export function MembersTab({ organizationId, userRole }: MembersTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [actionType, setActionType] = useState<'remove' | 'changeRole' | null>(null);

  // Mock data - replace with actual data fetching
  const members: Member[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'admin',
      joinedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'member',
      joinedAt: '2024-02-10'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'member',
      joinedAt: '2024-03-05'
    }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRemoveMember = (member: Member) => {
    setSelectedMember(member);
    setActionType('remove');
  };

  const handleChangeRole = (member: Member) => {
    setSelectedMember(member);
    setActionType('changeRole');
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'default' : 'secondary';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        {userRole === 'admin' && (
          <Button onClick={() => setShowInviteDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        )}
      </div>

      {userRole === 'member' && (
        <div className="bg-muted/50 border rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            You have read-only access to organization members
          </div>
        </div>
      )}

      {filteredMembers.length === 0 ? (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery ? 'No members found' : 'No members yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery 
              ? 'No members match your search criteria.'
              : 'Invite someone to get started with your organization.'
            }
          </p>
          {userRole === 'admin' && !searchQuery && (
            <Button onClick={() => setShowInviteDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Member
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Role
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Joined
                </th>
                {userRole === 'admin' && (
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge variant={getRoleBadgeVariant(member.role)}>
                      {member.role}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(member.joinedAt)}
                    </div>
                  </td>
                  {userRole === 'admin' && (
                    <td className="p-4 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleChangeRole(member)}>
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleRemoveMember(member)}
                            className="text-destructive"
                          >
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <InviteMemberDialog
        organizationId={organizationId}
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
      />

      <RemoveMemberDialog
        member={selectedMember}
        open={actionType === 'remove'}
        onOpenChange={(open) => !open && setActionType(null)}
      />

      <ChangeRoleDialog
        member={selectedMember}
        open={actionType === 'changeRole'}
        onOpenChange={(open) => !open && setActionType(null)}
      />
    </div>
  );
}