
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 bg-gray-50/50">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
