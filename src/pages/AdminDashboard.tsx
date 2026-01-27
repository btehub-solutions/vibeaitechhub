import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Users, BookOpen, TrendingUp, DollarSign, Plus, Edit, Trash2, 
  MoreHorizontal, Search, Filter, Calendar, Video, FileText, Settings
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

// Mock Data for unimplemented features
const stats = [
  { label: "Total Users", value: "2,847", icon: Users, change: "+12% this month", color: "text-blue-400" },
  { label: "Active Learners", value: "1,234", icon: TrendingUp, change: "+8% this week", color: "text-green-400" },
  { label: "Total Modules", value: "12", icon: BookOpen, change: "+2 this quarter", color: "text-purple-400" },
  { label: "Revenue (₦)", value: "4.2M", icon: DollarSign, change: "+23% this month", color: "text-amber-400" },
];

const users = [
  { id: 1, name: "Adebayo Okonkwo", email: "adebayo@example.com", plan: "Pro", modules: 5, status: "Active", joined: "Jan 15, 2025" },
  { id: 2, name: "Fatima Hassan", email: "fatima@example.com", plan: "Free", modules: 2, status: "Active", joined: "Jan 18, 2025" },
  { id: 3, name: "Chukwuemeka Nwachukwu", email: "chukwuemeka@example.com", plan: "Enterprise", modules: 8, status: "Active", joined: "Jan 10, 2025" },
];

type Tab = "overview" | "users" | "content" | "programs" | "tools";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const response = await api.get('/programs/');
      return response.data.results || response.data;
    }
  });

  // Derived modules from programs
  const modules = programs.flatMap((program: any) => 
    program.modules?.map((module: any) => ({
        id: module.id,
        title: module.title,
        lessons: module.lessons?.length || 0,
        enrolled: 0, // Need backend stat
        status: program.is_published ? "Published" : "Draft"
    })) || []
  );

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "users", label: "Users", icon: Users },
    { id: "content", label: "Content", icon: BookOpen },
    { id: "programs", label: "Programs", icon: Calendar },
    { id: "tools", label: "AI Tools", icon: Settings },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your platform, users, and content.</p>
            </div>
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 mb-8 overflow-x-auto pb-2"
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "hero" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="gap-2 whitespace-nowrap"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </motion.div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              {/* Stats Grid */}
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass-card p-6"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-primary/10 ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-primary">{stat.change}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Overview Tables */}
              <div className="grid lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="glass-card p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
                  <div className="space-y-3">
                    {users.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated/50">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.plan === "Pro" ? "bg-primary/20 text-primary" :
                          user.plan === "Enterprise" ? "bg-purple-500/20 text-purple-400" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {user.plan}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="glass-card p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Module Performance</h2>
                  <div className="space-y-3">
                    {modules.slice(0, 4).map((module: any) => (
                      <div key={module.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated/50">
                        <div>
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-muted-foreground">{module.lessons} lessons</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-primary">{module.enrolled}</div>
                          <div className="text-xs text-muted-foreground">enrolled</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6"
            >
             <p className="text-muted-foreground text-center">User management coming soon.</p>
            </motion.div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Modules</h2>
                <Button variant="hero" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Module
                </Button>
              </div>

              <div className="space-y-4">
               {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : modules.map((module: any) => (
                  <div key={module.id} className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated/50 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.lessons} lessons · {module.enrolled} enrolled</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        module.status === "Published" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {module.status}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit module">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" aria-label="Delete module">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Programs Tab */}
          {activeTab === "programs" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Programs & Events</h2>
                <div className="flex gap-2">
                  <Button variant="hero" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Program
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                     <div className="space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : programs.map((program: any) => (
                  <div key={program.id} className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated/50 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                         <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{program.title}</h3>
                        <p className="text-sm text-muted-foreground">Price: ₦{program.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                         {/* Capacity/Registered logic needed */}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        program.is_published ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        {program.is_published ? "Active" : "Draft"}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Edit program">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Tools Tab */}
          {activeTab === "tools" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">AI Tools Management</h2>
                <Button variant="hero" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Tool
                </Button>
              </div>
              <p className="text-muted-foreground text-center py-12">
                Manage trending AI tools that appear on the student dashboard and tools page.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
}
