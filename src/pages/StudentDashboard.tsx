import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Clock, Trophy, TrendingUp, Play, ChevronRight, 
  Calendar, Video, Zap, ArrowUpRight, Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get('/dashboard/');
      return response.data;
    },
    enabled: !!user
  });

  // Derived stats from API data
  const stats = [
    { 
      label: "Modules Enrolled", 
      value: dashboardData?.stats?.modules_enrolled?.toString() || "0", 
      icon: BookOpen, 
      change: "Active" 
    },
    { 
      label: "Hours Learned", 
      value: dashboardData?.stats?.hours_learned?.toString() || "0", 
      icon: Clock, 
      change: "Lifetime" 
    },
    { 
      label: "Lessons Complete", 
      value: dashboardData?.stats?.lessons_complete?.toString() || "0", 
      icon: Trophy, 
      change: "Keep going!" 
    },
    { 
      label: "Current Streak", 
      value: "1 day", 
      icon: TrendingUp, 
      change: "Log in daily" 
    },
  ];

  const enrolledModules = dashboardData?.active_enrollments?.map((enrollment: any) => ({
    id: enrollment.id,
    title: enrollment.program.title,
    progress: enrollment.progress || 0,
    lessons: enrollment.program.modules?.reduce((acc: number, mod: any) => acc + mod.lessons.length, 0) || 0,
    // completed: 0, // Not sending completed count yet in enrollments, simplified for now
    duration: "Flexible"
  })) || [];


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
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}</h1>
            <p className="text-muted-foreground">Continue your AI journey. You're making great progress.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isLoading ? (
               Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
               ))
            ) : (
              stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-4"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <stat.icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-primary mt-1">{stat.change}</div>
                </motion.div>
              ))
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enrolled Modules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Programs</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary"
                    onClick={() => navigate('/#modules')}
                  >
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : enrolledModules.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledModules.map((module: any) => (
                      <motion.div
                        key={module.id}
                        className="p-4 rounded-lg bg-surface-elevated/50 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                        whileHover={{ x: 4 }}
                        onClick={() => toast.info(`Coming soon: ${module.title}`)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{module.title}</h3>
                          <span className="text-sm text-primary">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2 mb-3" />
                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{module.lessons} lessons</span>
                          <span>{module.duration}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>You haven't enrolled in any programs yet.</p>
                        <Link to="/#modules">
                            <Button variant="link" className="mt-2 text-primary">Browse Programs</Button>
                        </Link>
                    </div>
                )}
              </motion.div>

                           {/* Recent Lessons (Placeholder/Future) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recommended for You</h2>
                </div>
                 <div className="text-center py-4 text-muted-foreground text-sm">
                    Complete your first lesson to get recommendations.
                 </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="glass-card p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Button 
                    variant="hero" 
                    className="w-full justify-start gap-2"
                    onClick={() => navigate('/#modules')}
                  >
                    <Play className="w-4 h-4" />
                    Start Learning
                  </Button>
                  <Button 
                    variant="heroOutline" 
                    className="w-full justify-start gap-2"
                    onClick={() => navigate('/#modules')}
                  >
                    <Star className="w-4 h-4" />
                    Browse Catalog
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
}
