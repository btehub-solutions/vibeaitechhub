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

// Mock Data
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
  { id: 4, name: "Aisha Mohammed", email: "aisha@example.com", plan: "Pro", modules: 4, status: "Inactive", joined: "Dec 28, 2024" },
  { id: 5, name: "Oluwaseun Adeyemi", email: "seun@example.com", plan: "Free", modules: 1, status: "Active", joined: "Jan 20, 2025" },
];

const modules = [
  { id: 1, title: "Foundations", lessons: 8, enrolled: 1847, status: "Published" },
  { id: 2, title: "Machine Learning Core", lessons: 14, enrolled: 1234, status: "Published" },
  { id: 3, title: "Deep Learning", lessons: 18, enrolled: 892, status: "Published" },
  { id: 4, title: "RAG Systems", lessons: 12, enrolled: 0, status: "Draft" },
];

const programs = [
  { id: 1, title: "AI Foundations Bootcamp", type: "Training", date: "Feb 15-Mar 15", registered: 17, capacity: 25 },
  { id: 2, title: "LLM Engineering Workshop", type: "Workshop", date: "Feb 22", registered: 38, capacity: 50 },
  { id: 3, title: "Weekly AI Office Hours", type: "Meeting", date: "Every Thursday", registered: 33, capacity: 100 },
];

type Tab = "overview" | "users" | "content" | "programs" | "tools";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");

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
                    {modules.slice(0, 4).map((module) => (
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
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="heroOutline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Modules</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.plan === "Pro" ? "bg-primary/20 text-primary" :
                            user.plan === "Enterprise" ? "bg-purple-500/20 text-purple-400" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {user.plan}
                          </span>
                        </TableCell>
                        <TableCell>{user.modules}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                        <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
                {modules.map((module) => (
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
                  <Button variant="heroOutline" size="sm" className="gap-2">
                    <Video className="w-4 h-4" />
                    Add Meeting
                  </Button>
                  <Button variant="hero" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Program
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {programs.map((program) => (
                  <div key={program.id} className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated/50 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        {program.type === "Meeting" ? <Video className="w-5 h-5 text-primary" /> : <Calendar className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{program.title}</h3>
                        <p className="text-sm text-muted-foreground">{program.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{program.registered}/{program.capacity}</div>
                        <div className="text-xs text-muted-foreground">registered</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        program.type === "Training" ? "bg-blue-500/20 text-blue-400" :
                        program.type === "Workshop" ? "bg-purple-500/20 text-purple-400" :
                        "bg-primary/20 text-primary"
                      }`}>
                        {program.type}
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
