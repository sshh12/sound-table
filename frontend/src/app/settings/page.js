'use client';

import { useState } from 'react';
import { useUser } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, User, Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  const { user } = useUser();

  return (
    <div className="h-full overflow-auto">
      <div className="container max-w-4xl py-6 px-4 md:px-8 md:py-10">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex items-center gap-2"
            >
              <SettingsIcon className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Manage your public profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar_url} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <Separator />
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue={user?.name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your app experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Theme</Label>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm">
                        Light
                      </Button>
                      <Button variant="outline" size="sm">
                        Dark
                      </Button>
                      <Button variant="outline" size="sm">
                        System
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm">
                        English
                      </Button>
                      <Button variant="outline" size="sm">
                        Spanish
                      </Button>
                      <Button variant="outline" size="sm">
                        French
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
