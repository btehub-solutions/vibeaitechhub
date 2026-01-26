import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Clock, Trophy, TrendingUp, Play, ChevronRight, 
  Calendar, Video, Zap, ArrowUpRight, Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";

// Mock Data
const enrolledModules = [
  { id: 1, title: "Foundations", progress: 85, lessons: 8, completed: 7, duration: "4 hours" },
  { id: 2, title: "Machine Learning Core", progress: 45, lessons: 14, completed: 6, duration: "10 hours" },
  { id: 3, title: "Deep Learning", progress: 12, lessons: 18, completed: 2, duration: "14 hours" },
];

const recentLessons = [
  { id: 1, title: "Backpropagation Explained", module: "Deep Learning", time: "2 hours ago", duration: "18 min" },
  { id: 2, title: "Gradient Descent Optimization", module: "Machine Learning Core", time: "Yesterday", duration: "24 min" },
  { id: 3, title: "Neural Network Architectures", module: "Deep Learning", time: "2 days ago", duration: "32 min" },
];

const upcomingPrograms = [
  { id: 1, title: "Weekly AI Office Hours", date: "Tomorrow", time: "4:00 PM WAT", type: "Meeting" },
  { id: 2, title: "LLM Engineering Workshop", date: "Feb 22", time: "2:00 PM WAT", type: "Workshop" },
];

const trendingTools = [
  { id: 1, name: "Claude 3.5", category: "LLM", status: "Hot" },
  { id: 2, name: "Midjourney v6", category: "Image Gen", status: "Trending" },
  { id: 3, name: "Cursor AI", category: "Code Editor", status: "New" },
];

const stats = [
  { label: "Modules Enrolled", value: "3", icon: BookOpen, change: "+1 this week" },
  { label: "Hours Learned", value: "24", icon: Clock, change: "+6 this week" },
  { label: "Lessons Complete", value: "15", icon: Trophy, change: "+3 today" },
  { label: "Current Streak", value: "7 days", icon: TrendingUp, change: "Keep it up" },
];

export default function StudentDashboard() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back, Learner</h1>
            <p className="text-muted-foreground">Continue your AI journey. You're making great progress.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((stat, index) => (
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
            ))}
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
                  <h2 className="text-xl font-semibold">Your Modules</h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {enrolledModules.map((module) => (
                    <motion.div
                      key={module.id}
                      className="p-4 rounded-lg bg-surface-elevated/50 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{module.title}</h3>
                        <span className="text-sm text-primary">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2 mb-3" />
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{module.completed}/{module.lessons} lessons</span>
                        <span>{module.duration}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Lessons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recently Viewed</h2>
                </div>
                <div className="space-y-3">
                  {recentLessons.map((lesson) => (
                    <motion.div
                      key={lesson.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-hover/50 transition-colors cursor-pointer group"
                      whileHover={{ x: 4 }}
                    >
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Play className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{lesson.module}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>{lesson.time}</div>
                        <div>{lesson.duration}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Programs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Upcoming</h2>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {upcomingPrograms.map((program) => (
                    <div
                      key={program.id}
                      className="p-3 rounded-lg bg-surface-elevated/50 border border-border/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {program.type}
                        </span>
                        <Video className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium text-sm mb-1">{program.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {program.date} at {program.time}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Trending AI Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Trending Tools</h2>
                  <Link to="/ai-tools">
                    <Button variant="ghost" size="sm" className="text-primary text-xs">
                      View All <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-2">
                  {trendingTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-primary/10">
                          <Zap className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">{tool.category}</div>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {tool.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="glass-card p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Button variant="hero" className="w-full justify-start gap-2">
                    <Play className="w-4 h-4" />
                    Continue Learning
                  </Button>
                  <Button variant="heroOutline" className="w-full justify-start gap-2">
                    <Star className="w-4 h-4" />
                    Browse Modules
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
